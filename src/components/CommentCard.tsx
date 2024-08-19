import React, { useState } from 'react';
import { Comment } from '../models/Comment';
import { likeComment } from '../services/comment';

interface CommentCardProps {
  comment: Comment;
  likesCount: number;
  avatarUrl: string;
  userId: number;
}

const CommentCard = ({
  comment,
  likesCount,
  avatarUrl,
  userId
}: CommentCardProps) => {
  const [localLikesCount, setLocalLikesCount] = useState(likesCount);

  const handleLike = async () => {
    try {
      const updatedCommentResponse = await likeComment(comment.commentId!, userId);
      if (updatedCommentResponse) {
        setLocalLikesCount(updatedCommentResponse.likesCount);
      }
    } catch (error) {
      console.error('Error liking comment:', error);
    }
  };

  return (
    <div className="card mb-3">
      <div className="card-body d-flex align-items-start">
        <img src={avatarUrl} alt="Avatar" className="rounded-circle" style={{ width: '50px', height: '50px' }} />
        <div className="ms-3 w-100">
          <h6 className="card-title mb-1">User {comment.userId}</h6>
          <p className="card-text">{comment.text}</p>
          <div className="d-flex justify-content-between align-items-center">
            <small className="text-muted">{comment.timePosted}</small>
            <button className="btn btn-outline-primary btn-sm" onClick={handleLike}>
              Like ({localLikesCount})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
