import React, { useState, useEffect } from "react";
import CommentCard from "./CommentCard";
import commentAvatar from "../assets/profile-default-icon.png";
import { getCommentsForPost, createComment } from "../services/comment";
import { Comment as CommentModel, CommentResponse } from "../models/Comment";

interface CommentsSectionProps {
  postId: bigint;
  userId: number;
}

// The CommentsSection component manages the display and addition of comments for a specific post.
const CommentsSection = ({ postId, userId }: CommentsSectionProps) => {
  // State to hold the list of comments and the new comment being added.
  const [comments, setComments] = useState<CommentResponse[]>([]);
  const [newComment, setNewComment] = useState<string>("");

  // useEffect to fetch comments when the component mounts or when postId or userId changes.
  useEffect(() => {
    const fetchComments = async () => {
      try {
        // Fetch comments for the post from the API and update the state.
        const initialComments = await getCommentsForPost(postId, userId);
        setComments(initialComments);
      } catch (error) {
        // Log any errors that occur during the fetch.
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
  }, [postId, userId]); // Dependencies: re-fetch comments when postId or userId changes.

  // useEffect to log the comments whenever they are updated.
  useEffect(() => {
    console.log(comments);
  }, [comments]);

  // Function to handle adding a new comment.
  const handleAddComment = async () => {
    if (newComment.trim() !== "") {
      try {
        // Create a new comment object with the current time.
        const newCommentData: CommentModel = {
          userId: userId,
          postId: postId,
          text: newComment,
          timePosted: new Date(),
        };
        // Send the new comment to the API and get the created comment back.
        const createdComment = await createComment(newCommentData);
        const newCommentResponse: CommentResponse = {
          comment: createdComment,
          likesCount: 0,
        };
        // Add the new comment to the state and clear the input field.
        setComments([...comments, newCommentResponse]);
        setNewComment("");
      } catch (error) {
        // Log any errors that occur during the comment creation.
        console.error("Error adding comment:", error);
      }
    }
  };

  return (
    <div>
      {/* Input field and button to add a new comment */}
      <div className="input-group mt-3">
        <input
          type="text"
          className="form-control"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
        />
        <button
          className="btn btn-outline-secondary"
          onClick={handleAddComment}
        >
          Comment
        </button>
      </div>

      <h6 className="mt-4">Comments</h6>
      {/* Map over the comments and render a CommentCard for each */}
      <div className="mb-3">
        {comments.map((comment) => (
          <CommentCard
            key={comment.comment.commentId} // Unique key for each comment
            comment={comment.comment} // The comment data
            likesCount={comment.likesCount} // The number of likes
            avatarUrl={commentAvatar} // URL of the avatar image
            userId={userId} // The ID of the current user, passed to CommentCard
          />
        ))}
      </div>
    </div>
  );
};

export default CommentsSection;
