import { IconButton } from "@mui/material";
import React from "react";
import PushPinIcon from '@mui/icons-material/PushPin';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';

interface Media {
  mediaId: bigint;
  postId: bigint;
  mediaUrl: string;
  mediaType: string;
  createdAt: string;
}

interface PostProps {
  post: {
    postId: bigint;
    userId: bigint;
    title: string;
    content: string;
    createdAt: string;
    updatedAt?: string;
    isPinned: boolean;
  };
  media: Media[];
  onEdit: (postId: bigint, title: string, content: string) => void;
  onDelete: (postId: bigint) => void;
  onPin: (postId: bigint, isPinned: String) => void;
  isEditing: boolean;
  editTitle: string;
  editContent: string;
  setEditTitle: (title: string) => void;
  setEditContent: (content: string) => void;
  handleUpdate: (event: React.FormEvent) => void;
}

const Post: React.FC<PostProps> = ({
  post,
  media,
  onEdit,
  onDelete,
  onPin,
  isEditing,
  editTitle,
  editContent,
  setEditTitle,
  setEditContent,
  handleUpdate,
}) => {
  const renderMedia = (mediaList: Media[]) => {
    return mediaList.map((mediaItem) => {
      const imageUrl = `http://localhost:8080/attachments/${
        mediaItem.mediaUrl
      }?${new Date().getTime()}`;
      if (mediaItem.mediaType === "IMAGE") {
        return (
          <img
            key={mediaItem.mediaId.toString()}
            src={imageUrl}
            alt="Post Media"
            className="post-media"
          />
        );
      } else if (mediaItem.mediaType === "VIDEO") {
        return (
          <video
            key={mediaItem.mediaId.toString()}
            controls
            className="post-media"
          >
            <source src={imageUrl} type="video/mp4" />
          </video>
        );
      }
      return null;
    });
  };

  return (
    <li className="post-box">
      <div className="post-header">
        <img
          src="path-to-profile-image.jpg"
          alt="User Profile"
          className="profile-image"
        />
        <div className="post-details">
          <h4 className="post-title">{post.title}</h4>
          <small className="post-time">
            {new Date(post.createdAt).toLocaleString()}
          </small>
        </div>
        <div className="post-actions">
          <button
            onClick={() => onEdit(post.postId, post.title, post.content)}
            className="edit-icon"
            title="Edit Post"
          >
            ✎
          </button>
          <button
            onClick={() => onDelete(post.postId)}
            className="delete-icon"
            title="Delete Post"
          >
            🗑️
          </button>

          {/* <button
            onClick={() => onPin(post.postId, post.isPinned ? "false" : "true")} // Change isPinned based on current state
            className="pin-icon"
            title={post.isPinned ? "Unpin Post" : "Pin Post"} // Change title based on state
          >
            {post.isPinned ? "📍Unpin" : " 📌 Pin"}
          </button> */}
          
          <IconButton
            onClick={() => onPin(post.postId, post.isPinned ? "false" : "true")}
            title={post.isPinned ? "Unpin Post" : "Pin Post"} // Change title based on state 
          >
            {post.isPinned ? <PushPinIcon /> : <PushPinOutlinedIcon />}
 
          </IconButton>
          
        </div>
      </div>
      <p className="post-content">{post.content}</p>
      {media && renderMedia(media)}
      {post.updatedAt && (
        <small className="post-updated">
          Updated at: {new Date(post.updatedAt).toLocaleString()}
        </small>
      )}

      {isEditing && (
        <form onSubmit={handleUpdate} className="update-post-form">
          <div>
            <label htmlFor="editTitle">New Title:</label>
            <input
              id="editTitle"
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="editContent">New Content:</label>
            <textarea
              id="editContent"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn">
            Update Post
          </button>
        </form>
      )}
    </li>
  );
};

export default Post;
