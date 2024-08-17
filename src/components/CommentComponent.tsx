import React, { useState, useRef, useEffect, ChangeEvent, MouseEvent } from "react"
import axios from "axios"

const CommentComponent: React.FC = () => {
	const [comment, setComment] = useState<string>("")
	const textareaRef = useRef<HTMLTextAreaElement>(null)

	useEffect(() => {
		if (textareaRef.current) {
			textareaRef.current.style.height = "auto"
			textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px` // Set height to fit content
		}
	}, [comment])

	// Handle changes to the textarea input
	const handleCommentChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
		setComment(event.target.value)
	}

	// Handle the click event to add a comment

	const handleAddComment = async (): Promise<void> => {
		const trimmedComment = comment.trim()
		console.log("Comment submitted:", trimmedComment)
		if (trimmedComment) {
			try {
				// POST request to the server with JSON payload
				const response = await axios.post(
					"http://localhost:8080/comments",
					{
						text: trimmedComment,
						userId: 1,
						postId: 1,
					},
					{
						headers: {
							"Content-Type": "application/json",
						},
					}
				)

				console.log("Comment submitted:", trimmedComment, " ", response.data)
			} catch (error) {
				console.error("Error submitting comment:", error)
			}
		} else {
			console.log("Comment is empty. Please enter a valid comment.")
		}
		setComment("") 
	}

	return (
		<div className='border d-flex flex-column w-50 p-2'>
			<div>
				<div className='mb-2'>
					<div className='d-flex align-items-center'>
						<img
							src='https://via.placeholder.com/40'
							alt='Profile'
							className='rounded-circle me-2'
							style={{ width: "40px", height: "40px" }}
						/>
						<span className='d-block'>Username</span>
					</div>
				</div>
				<div className='d-flex align-items-center'>
					<textarea
						ref={textareaRef}
						value={comment}
						onChange={handleCommentChange}
						className='form-control me-2'
						style={{ resize: "vertical", overflow: "hidden", width: "100%" }}
					/>
				</div>
				<div className='input-group-append mt-2'>
					<span className='btn btn-primary' onClick={handleAddComment}>
						Post
					</span>
				</div>
			</div>
		</div>
	)
}

export default CommentComponent
