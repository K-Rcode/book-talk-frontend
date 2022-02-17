import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { TiDelete, TiEdit } from 'react-icons/ti';
import API_URL from '../../apiConfig';

function Comments({ comments, logInStatus, userData, getSpecificBook }) {
	const [showA, setShowA] = useState(false);
	const [isLoading, setLoading] = useState(false);
	const [editCommentId, setEditCommentId] = useState(0);
	const [newComment, setNewComment] = useState({
		body: '',
		book_id: comments[0].book_id,
	});

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

	// bootstrap function to show toast
	const toggleShowA = (comment) => {
		setShowA(!showA);
		console.log(comment);
		setEditCommentId(comment.id);
	};
	function handleChange(event) {
		setNewComment({ ...newComment, [event.target.id]: event.target.value });
	}

	function editComment(event) {
		setNewComment({ ...newComment, body: event.target.value });
	}

	async function postComment() {
		const res = await axios.post(`${API_URL.url}comments/`, newComment, {
			headers: {
				Authorization: `Token ${localStorage.getItem('token')}`,
			},
		});
		console.log(res);
	}

	function handleClick() {
		setLoading(true);
		postComment();
		setNewComment({ ...newComment, body: '' })
	}

	async function handleDelete(comment) {
		const res = await axios.delete(`${API_URL.url}comments/${comment.id}`, {
			headers: {
				Authorization: `Token ${localStorage.getItem('token')}`,
			},
		});
		console.log(res);
	}

	async function handleEdit() {
		// await event.preventDefault();

		const res = await axios.put(
			`${API_URL.url}comments/${editCommentId}`,
			newComment,
			{
				headers: {
					Authorization: `Token ${localStorage.getItem('token')}`,
				},
			}
		);
		console.log(res);
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
									onClick={() => {
										toggleShowA(comment);
									}}
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
			<ToastContainer position='bottom-center' className='container-toast'>
				<Toast show={showA} onClose={toggleShowA}>
					<Toast.Header>
						<img
							src='holder.js/20x20?text=%20'
							className='rounded me-2'
							alt=''
						/>
						<strong className='me-auto'>Edit comment below</strong>
						<small>11 mins ago</small>
					</Toast.Header>
					<Toast.Body>
						<Form.Control
							type='text'
							placeholder='Comment here'
							onChange={editComment}
						/>
						<Button
							variant='primary'
							onClick={() => {
								handleEdit();
							}}>
							Update
						</Button>
					</Toast.Body>
				</Toast>
			</ToastContainer>

			{logInStatus && (
				<>
					{/* <Form.Label htmlFor='inputPassword5'>Password</Form.Label> */}
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
		</div>
	);
}

export default Comments;
