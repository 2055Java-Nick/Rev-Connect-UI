import React, { useState, useEffect } from "react";
import CommentCard from "./CommentCard";
import commentAvatar from "../assets/profile-default-icon.png";
import {
  getCommentsForPost,
  createComment,
  likeComment,
} from "../services/comment";
import { Comment as CommentModel, CommentResponse } from "../models/Comment";

interface CommentsSectionProps {
  postId: number;
  userId: number;
}

const CommentsSection = ({ postId, userId }: CommentsSectionProps) => {
  const [comments, setComments] = useState<CommentResponse[]>([]);
  const [newComment, setNewComment] = useState<string>("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const initialComments = await getCommentsForPost(postId, userId);
        console.log(initialComments);
        setComments(initialComments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
    console.log(comments);
  }, [postId, userId]);

  useEffect(() => {
    console.log(comments);
  }, [comments]);
  const handleAddComment = async () => {
    if (newComment.trim() !== "") {
      try {
        const newCommentData: CommentModel = {
          userId: userId,
          postId: postId,
          text: newComment,
          timePosted: new Date().toLocaleString(),
        };
        const createdComment = await createComment(newCommentData);
        const newCommentResponse: CommentResponse = {
          comment: createdComment,
          likesCount: 0,
        };
        setComments([...comments, newCommentResponse]);
        setNewComment("");
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };

  const handleLikeComment = async (commentId: number, userId: number) => {
    try {
      const updatedComment = await likeComment(commentId, userId);
      setComments(
        comments.map((comment) =>
          comment.comment.commentId === updatedComment.commentId
            ? { comment: updatedComment, likesCount: comment.likesCount }
            : comment
        )
      );
    } catch (error) {
      console.error("Error liking comment:", error);
    }
  };

  return (
    <div>
      <div className="input-group mt-3">
        <input
          type="text"
          className="form-control"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
        />
        <div className="input-group-append">
          <button
            className="btn btn-outline-secondary"
            onClick={handleAddComment}
          >
            Comment
          </button>
        </div>
      </div>

      <h6 className="mt-4">Comments</h6>
      <div className="mb-3">
        {comments.map((comment) => (
          <CommentCard
            key={comment.comment.commentId}
            avatarUrl={commentAvatar}
            commentResponse={comment}
            onLike={() =>
              handleLikeComment(
                comment.comment.commentId!,
                comment.comment.userId
              )
            }
            timePosted={
              comment.comment.timePosted || new Date().toLocaleString()
            }
            userId={comment.comment.userId}
            postId={comment.comment.postId}
            text={comment.comment.text}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentsSection;
