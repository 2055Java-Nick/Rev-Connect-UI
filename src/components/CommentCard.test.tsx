import React from "react";
import "@testing-library/jest-dom"; // **Import for extended matchers**
import { render, fireEvent, screen, waitFor } from "@testing-library/react"; // **Testing library helpers**
import { beforeEach, describe, expect, it, vi } from "vitest"; // **Testing utilities**

import CommentCard from "../components/CommentCard"; // **Import the component to test**
import { Comment } from "../models/CommentModel"; // **Import the Comment model type**
import avatar from "../assets/profile-default-icon.png"; // **Import the default avatar image**
import { likeComment } from "../services/api"; // **Import the likeComment service (mocked later)**

// Mock the `likeComment` service to control its behavior in tests
vi.mock("../services/comment", () => ({
  likeComment: vi.fn(),
}));

describe("CommentCard", () => {
  const mockComment: Comment = {
    commentId: 0,
    userId: 1,
    postId: BigInt(1),
    text: "This is a test comment",
    timePosted: new Date(),
  };

  const mockProps = {
    avatarUrl: avatar,
    comment: mockComment,
    likesCount: 5,
    userId: mockComment.userId,
  };

  beforeEach(() => {
    // Reset mocks before each test to ensure clean state
    vi.clearAllMocks();
  });

  it("renders the component with the correct props", () => {
    render(<CommentCard {...mockProps} />);

    // Check if the comment text is rendered
    expect(screen.getByText("This is a test comment")).toBeInTheDocument();

    // Check if the avatar image is rendered with the correct src
    const avatarImage = screen.getByAltText("Avatar") as HTMLImageElement;
    expect(avatarImage.src).toContain("profile-default-icon.png");

    // Check if the likes count is displayed correctly
    expect(screen.getByText("Like (5)")).toBeInTheDocument();

    // Check if the time posted is displayed correctly
    expect(
      screen.getByText(mockComment.timePosted.toString())
    ).toBeInTheDocument();
  });

  it("calls the likeComment function and updates the like count when the Like button is clicked", async () => {
    // Mock the likeComment service to return a new likes count
    (likeComment as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      likesCount: 6,
    });

    render(<CommentCard {...mockProps} />);

    // Click the "Like" button
    const likeButton = screen.getByText("Like (5)");
    fireEvent.click(likeButton);

    // Verify that the likeComment service was called with the correct arguments
    expect(likeComment).toHaveBeenCalledWith(
      mockComment.commentId,
      mockProps.userId
    );

    // Wait for the likes count to update asynchronously
    await screen.findByText("Like (6)");
    expect(screen.getByText("Like (6)")).toBeInTheDocument();
  });

  it("should display the correct number of likes", () => {
    render(<CommentCard {...mockProps} />);

    // Verify that the correct likes count is displayed
    const likesCountElement = screen.getByText("Like (5)");
    expect(likesCountElement).toBeInTheDocument();
  });

  it("toggles like and unlike correctly", async () => {
    // Initial like count is 3
    const initialLikesCount = 3;
    const likeResponse = { likesCount: initialLikesCount + 1 };
    const unlikeResponse = { likesCount: initialLikesCount };

    // Mock the likeComment function
    (likeComment as unknown as ReturnType<typeof vi.fn>)
      .mockResolvedValueOnce(likeResponse) // First click should increment likes
      .mockResolvedValueOnce(unlikeResponse); // Second click should decrement likes

    render(
      <CommentCard
        comment={mockComment}
        likesCount={initialLikesCount}
        avatarUrl="avatar.png"
        userId={1}
      />
    );

    // Verify initial like count
    expect(screen.getByText(`Like (${initialLikesCount})`)).toBeInTheDocument();

    // Simulate clicking the like button to increase likes
    const likeButton = screen.getByText(`Like (${initialLikesCount})`);
    fireEvent.click(likeButton);

    // Verify that likeComment was called and the like count updated
    await waitFor(() => {
      expect(likeComment).toHaveBeenCalledWith(mockComment.commentId, 1);
      expect(
        screen.getByText(`Like (${initialLikesCount + 1})`)
      ).toBeInTheDocument();
    });

    // Simulate clicking the like button again to decrease likes (unlike)
    fireEvent.click(likeButton);

    // Verify that likeComment was called again and the like count reverted
    await waitFor(() => {
      expect(likeComment).toHaveBeenCalledWith(mockComment.commentId, 1);
      expect(
        screen.getByText(`Like (${initialLikesCount})`)
      ).toBeInTheDocument();
    });
  });
});
