import React, { useState } from "react";
import { Comment } from "../models/Comment";
import { likeComment } from "../services/comment";
import "./comment.css";

interface CommentCardProps {
  comment: Comment; // The comment object containing details of the comment
  likesCount: number; // Initial number of likes for the comment
  avatarUrl: string; // URL for the user's avatar image
  userId: number; // ID of the current user
}

// The CommentCard component represents a single comment with its associated details.
const CommentCard = ({
  comment,
  likesCount,
  avatarUrl,
  userId,
}: CommentCardProps) => {
  // Local state to manage the number of likes displayed in the UI.
  const [localLikesCount, setLocalLikesCount] = useState(likesCount);

  // Function to handle when the user clicks the "Like" button.
  const handleLike = async () => {
    try {
      // Call the likeComment service to like the comment.
      const updatedCommentResponse = await likeComment(
        comment.commentId!,
        userId
      );
      // If the response is valid, update the local likes count.
      if (updatedCommentResponse) {
        setLocalLikesCount(updatedCommentResponse.likesCount);
      }
    } catch (error) {
      // Log any errors that occur during the like operation.
      console.error("Error liking comment:", error);
    }
  };

  return (
    <div className="card mb-3">
      {/* Card body containing the comment details */}
      <div className="card-body d-flex align-items-center">
        {/* Avatar image */}
        <img
          src={avatarUrl}
          alt="Avatar"
          className="rounded-circle"
          style={{
            width: "50px",
            height: "50px",
            transform: "translateY(-5px)",
          }}
        />
        <div className="ms-3 w-100 d-flex flex-column overflow-auto">
          {/* User information and comment text */}
          <h6 className="card-title mb-2 text-start">User {comment.userId}</h6>
          <p className="mb-2 card-text text-start ">{comment.text}</p>
          <div className="d-flex justify-content-between align-items-center mt-auto">
            {/* Display the time the comment was posted */}
            <small className="text-muted">
              {comment.timePosted.toString()}
            </small>
            {/* Like button that shows the number of likes */}
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={handleLike}
            >
              Like ({localLikesCount})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
