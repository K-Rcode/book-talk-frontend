import * as React from 'react';
import {Box, Button, Typography, Modal, TextField} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

export default function EditCommentModal({
	handleEdit,
	editComment,
	open,
	setOpen
}) {
	const handleClose = () => setOpen(false);
	return (
		<>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'>
				<Box sx={style}>
					<CloseIcon onClick={ handleClose } />
					<Typography id='modal-modal-title' variant='h6' component='h2'>
						Edit comment below
					</Typography>
						<TextField
							fullWidth
							id='outlined-basic'
							label='Edit Comment'
							variant='outlined'
							onChange={editComment}
						/>
					<Button
						variant='contained'
						size='small'
						onClick={() => {
							handleEdit();
						}}>
						Confirm
					</Button>
				</Box>
			</Modal>
		</>
	);
}
