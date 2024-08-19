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

vi.mock("../services/comment", () => ({
  getCommentsForPost: vi.fn(),
  createComment: vi.fn(),
  likeComment: vi.fn(),
}));

import { CommentResponse } from "../models/Comment";

describe("CommentsSection", () => {
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

  const mockNewComment = {
    commentId: 2,
    userId: 1,
    postId: 1,
    text: "New comment",
    timePosted: new Date(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the component with the correct elements", () => {
    render(<CommentsSection postId={1} userId={1} />);

    expect(screen.getByPlaceholderText("Add a comment")).toBeInTheDocument();
    expect(screen.getByText("Comment")).toBeInTheDocument();
  });

  it("fetches and displays comments on initial render", async () => {
    (getCommentsForPost as vi.Mock).mockResolvedValue(mockComments);

    render(<CommentsSection postId={1} userId={1} />);

    await waitFor(() => {
      expect(screen.getByText("This is a test comment")).toBeInTheDocument();
      expect(screen.getByText("Like (3)")).toBeInTheDocument();
    });

    expect(getCommentsForPost).toHaveBeenCalledWith(1, 1);
  });

  it("adds a new comment and displays it", async () => {
    (createComment as vi.Mock).mockResolvedValue(mockNewComment);
    (getCommentsForPost as vi.Mock).mockResolvedValue([]);

    render(<CommentsSection postId={1} userId={1} />);

    const input = screen.getByPlaceholderText("Add a comment");
    fireEvent.change(input, { target: { value: "New comment" } });

    const button = screen.getByText("Comment");
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("New comment")).toBeInTheDocument();
      expect(screen.getByText("Like (0)")).toBeInTheDocument();
    });

    expect(createComment).toHaveBeenCalledWith({
      userId: 1,
      postId: 1,
      text: "New comment",
      timePosted: expect.any(Date),
    });
  });

  it("likes a comment and updates the like count", async () => {
    const updatedComment = {
      ...mockComments[0].comment,
      likesCount: 4,
    };

    (getCommentsForPost as vi.Mock).mockResolvedValue(mockComments);
    (likeComment as vi.Mock).mockResolvedValue(updatedComment);

    render(<CommentsSection postId={1} userId={1} />);

    await waitFor(() => {
      expect(screen.getByText("This is a test comment")).toBeInTheDocument();
      expect(screen.getByText("Like (3)")).toBeInTheDocument();
    });

    const likeButton = screen.getByText("Like");
    fireEvent.click(likeButton);

    await waitFor(() => {
      expect(screen.getByText("Like (4)")).toBeInTheDocument();
    });

    expect(likeComment).toHaveBeenCalledWith(1, 1);
  });

  it("handles errors gracefully when fetching comments fails", async () => {
    (getCommentsForPost as vi.Mock).mockRejectedValue(
      new Error("Failed to fetch comments")
    );

    render(<CommentsSection postId={1} userId={1} />);

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith(
        "Error fetching comments:",
        expect.any(Error)
      );
    });
  });
});
