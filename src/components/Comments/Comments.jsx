import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, } from 'react-bootstrap';
import { TiDelete, TiEdit } from 'react-icons/ti';
import API_URL from '../../apiConfig';
import { Alert } from '@mui/material';
import EditCommentModal from '../EditCommentModal/EditCommentModal';

function Comments({ id, comments, logInStatus, userData, getSpecificBook }) {
	const [isLoading, setLoading] = useState(false);
	const [editCommentId, setEditCommentId] = useState(0);
	const [commentDeleted, setCommentDeleted] = useState(false);
	const [newComment, setNewComment] = useState({
		body: '',
		book_id: id,
	});
	const [open, setOpen] = useState(false);
	const handleOpen = (comment) => {
		setOpen(true);
		setEditCommentId(comment.id);
		console.log(comment)
	};

	// bootstrap helper function to transition "add comment" button text to "adding..."
	function simulateNetworkRequest() {
		return new Promise((resolve) => setTimeout(resolve, 2000));
	}

	useEffect(() => {
		if (isLoading) {
			simulateNetworkRequest().then(() => {
				setLoading(false);
			});
		}
	}, [isLoading]);

	useEffect(() => {
		getSpecificBook();
		//eslint-disable-next-line
	}, []);
	
	function handleChange(event) {
		setNewComment({ ...newComment, [event.target.id]: event.target.value });
	}

	function editComment(event) {
		setNewComment({ ...newComment, body: event.target.value });
	}

	function handleClick() {
		setLoading(true);
		postComment();
		setNewComment({ ...newComment, body: '' });
	}

	async function postComment() {
		try {
			const res = await axios.post(`${API_URL.url}comments/`, newComment, {
				headers: {
					Authorization: `Token ${localStorage.getItem('token')}`,
				},
			});
			if (res.status === 201) {
				getSpecificBook();
			}
		} catch (error) {
			
		}
	}

	async function handleDelete(comment) {
		try {
			const res = await axios.delete(`${API_URL.url}comments/${comment.id}`, {
				headers: {
					Authorization: `Token ${localStorage.getItem('token')}`,
				},
			});
			if (res.status === 204) {
				// alert('comment deleted');
				setCommentDeleted(true);
				setTimeout(() => {
					setCommentDeleted(false);
				}, 3000);
				getSpecificBook();
			}
		} catch (error) {
			
		}
	}

	async function handleEdit() {
		try {
			const res = await axios.put(
				`${API_URL.url}comments/${editCommentId}`,
				newComment,
				{
					headers: {
						Authorization: `Token ${localStorage.getItem('token')}`,
					},
				}
			);
			if (res.status === 200) {
				getSpecificBook();
				setOpen(false);
			}
		} catch (error) {
			
		}
	}

	if (!userData) {
		return comments.map((comment) => {
			return (
				<div key={comment.id}>
					<p className='comment-body'>{comment.body}</p>

					<p>
						Coment by: {comment.owner} on {comment.time_stamp.substring(0, 10)}
					</p>
				</div>
			);
		});
	}

	return (
		<div>
			{comments.map((comment) => {
				return (
					<div key={comment.id}>
						<p className='comment-body'>{comment.body}</p>

						{userData.username && userData.username === comment.owner && (
							<>
								<TiDelete
									onClick={() => {
										handleDelete(comment);
									}}
								/>

								<TiEdit
									onClick={() => {handleOpen(comment)}}
								/>
							</>
						)}
						<p>
							Coment by: {comment.owner} on{' '}
							{comment.time_stamp.substring(0, 10)}
						</p>
					</div>
				);
			})}

			{commentDeleted && <Alert severity='success'>Comment deleted</Alert>}

			{/* Add a comment */}
			{logInStatus && (
				<>
					<Form.Control
						type='text'
						id='body'
						aria-describedby='passwordHelpBlock'
						onChange={handleChange}
						value={newComment.body}
					/>
					<Form.Text id='passwordHelpBlock' muted>
						Add a new comment here ⬆️
					</Form.Text>
					<Button
						variant='primary'
						disabled={isLoading}
						onClick={!isLoading ? handleClick : null}>
						{isLoading ? 'Adding...' : 'Add Comment'}
					</Button>
				</>
			)}
			<EditCommentModal handleEdit={handleEdit} editComment={editComment} open={open} setOpen={setOpen}/>
		</div>
	);
}

export default Comments;
