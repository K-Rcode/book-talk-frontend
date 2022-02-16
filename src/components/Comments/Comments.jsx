import React from 'react';

function Comments({ comments, logInStatus }) {
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
						{logInStatus && (
							<>
								<input type='text-area' placeholder='Comment here'></input>
								<br />
								<button>Add Comment</button>
							</>
						)}
					</div>
				);
			})}
		</div>
	);
}

export default Comments;
