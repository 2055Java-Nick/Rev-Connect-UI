import React from "react";
import { Media, PostProps } from "../../types/postTypes";
import { IconButton } from "@mui/material";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined"; // need to run ' npm install @mui/icons-material ' or will give errors

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
            className="img-fluid my-2"
          />
        );
      } else if (mediaItem.mediaType === "VIDEO") {
        return (
          <video key={mediaItem.mediaId.toString()} controls className="w-100">
            <source src={imageUrl} type="video/mp4" />
          </video>
        );
      }
      return null;
    });
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <div className="d-flex align-items-center">
            <img
              src="path-to-profile-image.jpg"
              alt="User Profile"
              className="rounded-circle me-3"
              style={{ width: "50px", height: "50px" }}
            />
            <div>
              <h5 className="card-title mb-0">{post.title}</h5>
              <small className="text-muted">
                {new Date(post.createdAt).toLocaleString()}
              </small>
            </div>
          </div>
          <div>
            <button
              onClick={() => onEdit(post.postId, post.title, post.content)}
              className="btn btn-sm btn-outline-primary me-2"
              title="Edit Post"
            >
              ✎
            </button>
            <button
              onClick={() => onDelete(post.postId)}
              className="btn btn-sm btn-outline-danger"
              title="Delete Post"
            >
              🗑️
            </button>
            <IconButton
              onClick={() =>
                onPin(post.postId, post.isPinned ? "false" : "true")
              }
              title={post.isPinned ? "Unpin Post" : "Pin Post"} // Change title based on state
            >
              {post.isPinned ? <PushPinIcon /> : <PushPinOutlinedIcon />}
            </IconButton>
          </div>
        </div>
        <p className="card-text">{post.content}</p>
        {media && renderMedia(media)}
        {post.updatedAt && (
          <small className="text-muted">
            Updated at: {new Date(post.updatedAt).toLocaleString()}
          </small>
        )}
      </div>

      {isEditing && (
        <div className="card-footer">
          <form onSubmit={handleUpdate}>
            <div className="mb-3">
              <label htmlFor="editTitle" className="form-label">
                New Title:
              </label>
              <input
                id="editTitle"
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                required
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="editContent" className="form-label">
                New Content:
              </label>
              <textarea
                id="editContent"
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                required
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-success">
              Update Post
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Post;
