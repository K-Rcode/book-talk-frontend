import React, { useEffect, useState } from 'react';
import API_URL from '../../apiConfig';
import { useParams } from 'react-router-dom';
import Comments from '../Comments/Comments';
import { CardActionArea, Card, CardContent, CardMedia, Typography, Container, Collapse, Divider } from '@mui/material';
import { MdUnfoldMore } from 'react-icons/md';

function BookDetail({ logInStatus, userData }) {
	const { id } = useParams();
	const [bookData, setBookData] = useState(null);
	const [expanded, setExpanded] = useState(false)
	useEffect(() => {
		getSpecificBook();
		return () => {
			setBookData(null);
		};
		//eslint-disable-next-line
	}, [id]);

	async function getSpecificBook() {
		try {
			const res = await fetch(`${API_URL.url}books/${id}`);
			const data = await res.json();
			setBookData(data);
		} catch (error) {
			console.log(error);
		}
	}

	const handleClick = () => {
		setExpanded(!expanded)
	}

	if (!bookData) return null;

	return (
		<>
			<Typography gutterBottom variant='h4' 	component='div'>
					{bookData.title}
			</Typography>
			<Typography variant='body1'>by: {bookData.author}</Typography>
			<Container maxWidth="md" sx={{ display: 'flex', marginTop: '4%'}}>
				<Card
					sx={{ maxWidth: '70%', border: 2, borderColor: 'grey.500', }}
					className='m-auto'>
					<CardActionArea>
						<CardMedia
							component='img'
							height='30%'
							image={bookData.image}
							alt={bookData.title}
							sx={{height: '350px', objectFit: 'contain'}}
						/>
						<Divider />
						<CardContent>
							Book summary <MdUnfoldMore onClick={handleClick } />
							<Collapse in={expanded} timeout="auto" unmountOnExit>
							<Typography variant='body2' color='text.secondary'>
								{bookData.description}
								</Typography>
								</Collapse>
						</CardContent>
					</CardActionArea>
				</Card>
			<Comments
				id={id}
				comments={bookData.comments}
				logInStatus={logInStatus}
				userData={userData}
				getSpecificBook={getSpecificBook}
				/>
				</Container>
		</>
	);
}

export default BookDetail;
