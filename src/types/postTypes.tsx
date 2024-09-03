export interface Media {
  mediaId: number;
  postId: number;
  mediaUrl: number;
  mediaType: string;
  createdAt: string;
}

export interface Post {
  postId: number;
  userId: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
  isPinned: boolean;
}

export interface PostProps {
  post: Post;
  media: Media[];
  onEdit: (postId: number, title: string, content: string) => void;
  onDelete: (postId: number) => void;
  isEditing: boolean;
  editTitle: string;
  editContent: string;
  setEditTitle: (title: string) => void;
  setEditContent: (content: string) => void;
  handleUpdate: (event: React.FormEvent) => void;
  onPin: (postId: number, isPinned: String) => void;
}
