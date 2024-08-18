import React from "react";
import { Comment as CommentModel, CommentResponse } from "../models/Comment";
import "./comment.css";

interface CommentCardProps extends CommentModel {
  onLike: () => Promise<void>;
  avatarUrl: string;
  commentResponse: CommentResponse;
  timePosted: string;
}

const CommentCard = ({
  avatarUrl,
  commentResponse,
  onLike,
  timePosted,
}: CommentCardProps) => {
  return (
    <div className="card mb-2">
      <div className="card-body d-flex">
        <div className="mr-3">
          <img
            src={avatarUrl}
            alt="User Avatar"
            className="rounded-circle"
            style={{
              width: "40px",
              height: "40px",
              transform: "translateY(-5px)",
            }}
          />
        </div>
        <div className="flex-grow-1">
          <p className="mb-0 text-start" style={{ marginLeft: "20px" }}>
            {commentResponse.comment.text}
          </p>
          <div className="d-flex justify-content-center align-items-center mt-2">
            <button className="btn btn-outline-primary btn-sm" onClick={onLike}>
              Like
            </button>
            <span className="ml-2">{commentResponse.likesCount} likes</span>
          </div>
          <p className="text-end text-muted">{timePosted}</p>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
