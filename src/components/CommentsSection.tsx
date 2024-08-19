import React, { useState, useEffect } from 'react';
import CommentCard from './CommentCard';
import commentAvatar from '../assets/profile-default-icon.png';
import { getCommentsForPost, createComment } from '../services/comment';
import { Comment as CommentModel, CommentResponse } from '../models/Comment';

interface CommentsSectionProps {
  postId: number;
  userId: number;
}

const CommentsSection = ({ postId, userId }: CommentsSectionProps) => {
  const [comments, setComments] = useState<CommentResponse[]>([]);
  const [newComment, setNewComment] = useState<string>('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const initialComments = await getCommentsForPost(postId, userId);
        setComments(initialComments);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
    fetchComments();
  }, [postId, userId]);
  useEffect(() => {
    console.log(comments);
  }, [comments]);
  const handleAddComment = async () => {
    if (newComment.trim() !== '') {
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
        setNewComment('');
      } catch (error) {
        console.error('Error adding comment:', error);
      }
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
        <button className="btn btn-outline-secondary" onClick={handleAddComment}>
          Comment
        </button>
      </div>

      <h6 className="mt-4">Comments</h6>
      <div className="mb-3">
        {comments.map((comment) => (
          <CommentCard
            key={comment.comment.commentId}
            comment={comment.comment}
            likesCount={comment.likesCount}
            avatarUrl={commentAvatar}
            userId={userId} // Pass userId to CommentCard
          />
        ))}
      </div>
    </div>
  );
};

export default CommentsSection;
