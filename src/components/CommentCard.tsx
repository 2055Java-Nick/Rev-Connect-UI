import React from "react";
import { Comment as CommentModel, CommentResponse } from "../models/Comment";

interface CommentCardProps extends CommentModel {
  onLike: () => Promise<void>;
  avatarUrl: string;
  commentResponse: CommentResponse
}

const CommentCard = ({avatarUrl,commentResponse, onLike }:CommentCardProps) => {
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
        <div className="">
          <p className="mb-0">{commentResponse.comment.text}</p>
          <div className="d-flex align-items-center mt-2">
            <button className="btn btn-outline-primary btn-sm" onClick={onLike}>
              Like
            </button>
            <span className="ml-2">{commentResponse.likesCount} likes</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
