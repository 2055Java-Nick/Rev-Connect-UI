import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import PostPage from "./PostPage";
import { describe, expect, vi, beforeEach, afterEach, test } from "vitest";
import {
  deletePostById,
  getMediaByPostId,
  getPostsByPage,
  updatePostById,
} from "../../services/postApi";

vi.mock("../../services/postApi", () => ({
  getPostsByPage: vi.fn(),
  updatePostById: vi.fn(),
  deletePostById: vi.fn(),
  getMediaByPostId: vi.fn(),
}));

describe("PostPage Component", () => {
  const mockPosts = [
    {
      postId: BigInt(1),
      title: "Test Post 1",
      content: "Content for Post 1",
      createdAt: "2024-08-19T12:00:00Z",
      updatedAt: "2024-08-19T14:00:00Z",
    },
    {
      postId: BigInt(2),
      title: "Test Post 2",
      content: "Content for Post 2",
      createdAt: "2024-08-18T12:00:00Z",
    },
  ];

  const mockMedia = [
    {
      mediaId: BigInt(1),
      postId: BigInt(1),
      mediaUrl: "image1.jpg",
      mediaType: "IMAGE",
      createdAt: "2024-08-19T12:30:00Z",
    },
  ];

  beforeEach(() => {
    (getPostsByPage as ReturnType<typeof vi.fn>).mockResolvedValue(mockPosts);
    (getMediaByPostId as ReturnType<typeof vi.fn>).mockResolvedValue(mockMedia);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("renders correctly the number of posts", async () => {
    render(<PostPage />);

    // Wait for posts to load
    await waitFor(() => {
      const post1 = screen.getByText(
        (content, element) =>
          content.includes("Test Post 1") &&
          element?.tagName.toLowerCase() === "h5"
      );
      const post2 = screen.getByText(
        (content, element) =>
          content.includes("Test Post 2") &&
          element?.tagName.toLowerCase() === "h5"
      );

      expect(post1).toBeInTheDocument();
      expect(post2).toBeInTheDocument();
    });
  });

  test("handles pagination", async () => {
    render(<PostPage />);

    await waitFor(() =>
      expect(screen.getByText("Test Post 1")).toBeInTheDocument()
    );

    // Click next page button
    fireEvent.click(screen.getByRole("button", { name: /Next/i }));

    // Ensure getPostsByPage was called with the correct page number
    await waitFor(() => expect(getPostsByPage).toHaveBeenCalledWith(1));

    // Click previous page button
    fireEvent.click(screen.getByRole("button", { name: /Previous/i }));

    await waitFor(() => expect(getPostsByPage).toHaveBeenCalledWith(0));
  });
});
