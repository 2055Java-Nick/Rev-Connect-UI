import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import CommentsSection from "../components/CommentsSection";
import {
  getCommentsForPost,
  createComment,
  likeComment,
} from "../services/comment";

// Mock the `comment` services used by the component
vi.mock("../services/comment", () => ({
  getCommentsForPost: vi.fn(), // Mock function for fetching comments
  createComment: vi.fn(), // Mock function for creating a new comment
  likeComment: vi.fn(), // Mock function for liking a comment
}));

import { CommentResponse } from "../models/CommentModel";

// Describe the test suite for the CommentsSection component
describe("CommentsSection", () => {
  // Mock data for comments
  const mockComments: CommentResponse[] = [
    {
      comment: {
        commentId: 1,
        userId: 1,
        postId: 1,
        text: "This is a test comment",
        timePosted: new Date(),
      },
      likesCount: 3,
    },
  ];

  // Mock data for a newly added comment
  const mockNewComment = {
    commentId: 2,
    userId: 1,
    postId: 1,
    text: "New comment",
    timePosted: new Date(),
  };

  // Clear all mocks before each test to avoid interference between tests
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Test that the component renders the basic elements correctly
  it("renders the component with the correct elements", () => {
    render(<CommentsSection postId={1} userId={1} />);

    // Verify that the input field and button are rendered
    expect(screen.getByPlaceholderText("Add a comment")).toBeInTheDocument();
    expect(screen.getByText("Comment")).toBeInTheDocument();
  });

  // Test that the component fetches and displays comments on initial render
  it("fetches and displays comments on initial render", async () => {
    // Mock the resolved value for fetching comments
    (
      getCommentsForPost as unknown as ReturnType<typeof vi.fn>
    ).mockResolvedValue(mockComments);

    render(<CommentsSection postId={1} userId={1} />);

    // Wait for the comments to be displayed
    await waitFor(() => {
      expect(screen.getByText("This is a test comment")).toBeInTheDocument();
      expect(screen.getByText("Like (3)")).toBeInTheDocument();
    });

    // Verify that the service was called with the correct parameters
    expect(getCommentsForPost).toHaveBeenCalledWith(1, 1);
  });

  // Test that a new comment can be added and displayed correctly
  it("adds a new comment and displays it", async () => {
    // Mock the resolved value for creating a new comment
    (createComment as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(
      mockNewComment
    );
    // Mock the resolved value for fetching comments (empty array initially)
    (
      getCommentsForPost as unknown as ReturnType<typeof vi.fn>
    ).mockResolvedValue([]);

    render(<CommentsSection postId={1} userId={1} />);

    // Simulate user input and button click to add a new comment
    const input = screen.getByPlaceholderText("Add a comment");
    fireEvent.change(input, { target: { value: "New comment" } });

    const button = screen.getByText("Comment");
    fireEvent.click(button);

    // Wait for the new comment to be displayed
    await waitFor(() => {
      expect(screen.getByText("New comment")).toBeInTheDocument();
      expect(screen.getByText("Like (0)")).toBeInTheDocument();
    });

    // Verify that the createComment service was called with the correct data
    expect(createComment).toHaveBeenCalledWith({
      userId: 1,
      postId: 1,
      text: "New comment",
      timePosted: expect.any(Date),
    });
  });

  // Test that liking a comment updates the like count correctly
  it("likes a comment and updates the like count", async () => {
    // Mock the resolved value for fetching comments
    (
      getCommentsForPost as unknown as ReturnType<typeof vi.fn>
    ).mockResolvedValue(mockComments);
    // Mock the resolved value for liking a comment
    (likeComment as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      ...mockComments[0].comment,
      likesCount: 4,
    });

    render(<CommentsSection postId={1} userId={1} />);

    // Wait for the comment to be displayed with its initial like count
    await waitFor(() => {
      expect(screen.getByText("This is a test comment")).toBeInTheDocument();
      expect(screen.getByText("Like (3)")).toBeInTheDocument();
    });

    // Simulate a click on the "Like" button
    const likeButton = screen.getByText(/Like \(\d+\)/);
    fireEvent.click(likeButton);

    // Wait for the like count to be updated in the UI
    await waitFor(() => {
      expect(screen.getByText("Like (4)")).toBeInTheDocument();
    });

    // Verify that the likeComment service was called with the correct parameters
    expect(likeComment).toHaveBeenCalledWith(1, 1);
  });

  // Test that errors during fetching comments are handled gracefully
  it("handles errors gracefully when fetching comments fails", async () => {
    // Mock the console.error method to silence output in the test
    const consoleErrorMock = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    // Mock the rejected value for fetching comments
    (
      getCommentsForPost as unknown as ReturnType<typeof vi.fn>
    ).mockRejectedValue(new Error("Failed to fetch comments"));

    render(<CommentsSection postId={1} userId={1} />);

    // Wait for the error to be logged
    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith(
        "Error fetching comments:",
        expect.any(Error)
      );
    });
    // Restore the original console.error behavior
    consoleErrorMock.mockRestore();
  });
});
