import React, { useEffect, useState } from "react"
import CommentsSection from "../CommentsSection"
import { PostResponse, Post as PostType } from "../../models/PostModel"
import { likePost } from "../../services/api"
import commentAvatar from "../../assets/profile-default-icon.png";

interface Media {
	mediaId: bigint
	postId: bigint
	mediaUrl: string
	mediaType: string
	createdAt: string
}

interface PostProps {
	postResponse: PostResponse
	media: Media[]
	onEdit: (postId: bigint, title: string, content: string) => void
	onDelete: (postId: bigint) => void
	isEditing: boolean
	editTitle: string
	editContent: string
	setEditTitle: (title: string) => void
	setEditContent: (content: string) => void
	handleUpdate: (event: React.FormEvent) => void
}

const Post: React.FC<PostProps> = ({
	postResponse,
	media,
	onEdit,
	onDelete,
	isEditing,
	editTitle,
	editContent,
	setEditTitle,
	setEditContent,
	handleUpdate,
}) => {
	const [localLikesCount, setLocalLikesCount] = useState(postResponse.postLikes)
	const { post } = postResponse

	console.log(`${post.postId}: `, media)	
	const renderMedia = (mediaList: Media[]) => {
		return mediaList.map((mediaItem) => {
			const imageUrl = `http://localhost:8080/attachments/${
				mediaItem.mediaUrl
			}?${new Date().getTime()}`
		
			if (mediaItem.mediaType === "IMAGE") {
				return (
					<img
						key={mediaItem.mediaId.toString()}
						src={imageUrl}
						alt='Post Media'
						className='post-media'
					/>
				)
			} else if (mediaItem.mediaType === "VIDEO") {
				return (
					<video key={mediaItem.mediaId.toString()} controls className='post-media'>
						<source src={imageUrl} type='video/mp4' />
					</video>
				)
			}
			return null
		})
	}
	useEffect(() => {
	}, [media]);
	

	const handleLike = async () => {
		try {
			// Call the likeComment service to like the comment.
			const updatedPostResponse = await likePost(post.postId, post.userId)
			// If the response is valid, update the local likes count.
			if (updatedPostResponse) {
				setLocalLikesCount(updatedPostResponse.postLikes)
			}
		} catch (error) {
			// Log any errors that occur during the like operation.
			console.error("Error liking comment:", error)
		}
	}

	return (
		<div className='post-box'>
			<div>
				<li className=''>
					<div className='post-header'>
						
						<img
							src={commentAvatar}
							alt='User Profile'
							className='profile-image'
						/>
						{post.userId}
						<div className='post-details'>
							<h4 className='post-title'>{post.title}</h4>
							<small className='post-time'>
								{new Date(post.createdAt).toLocaleString()}
							</small>
						</div>
						<div className='post-actions'>
							<button
								onClick={() => onEdit(post.postId, post.title, post.content)}
								className='edit-icon'
								title='Edit Post'>
								✎
							</button>
							<button
								onClick={() => onDelete(post.postId)}
								className='delete-icon'
								title='Delete Post'>
								🗑️
							</button>
						</div>
						<div>
							<button className='btn btn-outline-primary btn-sm' onClick={handleLike}>
								Like ({localLikesCount})
							</button>
						</div>
					</div>
					<p className='post-content'>{post.content}</p>
					{media && renderMedia(media)}
					
					{post.updatedAt && (
						<small className='post-updated'>
							Updated at: {new Date(post.updatedAt).toLocaleString()}
						</small>
					)}

					{isEditing && (
						<form onSubmit={handleUpdate} className='update-post-form'>
							<div>
								<label htmlFor='editTitle'>New Title:</label>
								<input
									id='editTitle'
									type='text'
									value={editTitle}
									onChange={(e) => setEditTitle(e.target.value)}
									required
								/>
							</div>
							<div>
								<label htmlFor='editContent'>New Content:</label>
								<textarea
									id='editContent'
									value={editContent}
									onChange={(e) => setEditContent(e.target.value)}
									required
								/>
							</div>
							<button type='submit' className='btn'>
								Update Post
							</button>
						</form>
					)}
				</li>
			</div>
			<div>
				<CommentsSection
					userId={1} // placeholder
					postId={post.postId}
				/>
			</div>
		</div>
	)
}

export default Post
