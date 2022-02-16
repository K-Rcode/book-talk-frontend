import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import API_URL from '../../apiConfig';

function Comments({ comments, logInStatus, userData, getSpecificBook }) {
	const [isLoading, setLoading] = useState(false);
	const [newComment, setNewComment] = useState({
		body: '',
		book_id: comments[0].book_id,
	});

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
	}, [comments]);

	function handleChange(event) {
		setNewComment({ ...newComment, [event.target.id]: event.target.value });
	}

	async function postComment() {
		// console.log('hello');
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

	return (
		<div>
			{comments.map((comment) => {
				return (
					<div key={comment.id}>
						<p>{comment.body}</p>
						<p>
							Coment by: {comment.owner} on{' '}
							{comment.time_stamp.substring(0, 10)}
						</p>
					</div>
				);
			})}
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
