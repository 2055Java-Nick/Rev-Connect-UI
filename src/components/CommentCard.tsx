import React from "react";
import { Comment as CommentModel } from "../models/Comment";

interface CommentCardProps extends CommentModel {
  onLike: () => void;
  avatarUrl: string;
  
}

const CommentCard = ({ text, avatarUrl, likes, onLike }: CommentCardProps) => {
  return (
    <div className="card mb-2">
      <div className="card-body d-flex justify-content-center">
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
          <p className="mb-0">{text}</p>
          <div className="d-flex align-items-center mt-2">
            <button className="btn btn-outline-primary btn-sm" onClick={onLike}>
              Like
            </button>
            <span className="ml-2">{likes} likes</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
