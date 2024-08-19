import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import CommentCard from "../components/CommentCard";
import { Comment } from "../models/Comment";
import avatar from "../assets/profile-default-icon.png";
import { likeComment } from "../services/comment";

// Mock the `likeComment` service
vi.mock("../services/comment");

describe("CommentCard", () => {
  const mockComment: Comment = {
    commentId: 0,
    userId: 1,
    postId: 1,
    text: "This is a test comment",
    timePosted: "2024-08-19 10:30:00 AM",
  };

  const mockProps = {
    avatarUrl: avatar,
    comment: mockComment,
    likesCount: 5,
    userId: mockComment.userId,
  };

  beforeEach(() => {
    // Reset mocks before each test
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
    expect(screen.getByText("2024-08-19 10:30:00 AM")).toBeInTheDocument();
  });

  it("calls the likeComment function and updates the like count when the Like button is clicked", async () => {
    (likeComment as vi.Mock).mockResolvedValue({ likesCount: 6 });

    render(<CommentCard {...mockProps} />);

    // Click the "Like" button
    const likeButton = screen.getByText("Like (5)");
    fireEvent.click(likeButton);

    // Verify that the likeComment service was called
    expect(likeComment).toHaveBeenCalledWith(
      mockComment.commentId,
      mockProps.userId
    );

    // Wait for the likes count to update
    await screen.findByText("Like (6)");
    expect(screen.getByText("Like (6)")).toBeInTheDocument();
  });

  it("should display the correct number of likes", () => {
    render(<CommentCard {...mockProps} />);

    // Verify that the correct likes count is displayed
    const likesCountElement = screen.getByText("Like (5)");
    expect(likesCountElement).toBeInTheDocument();
  });
});
