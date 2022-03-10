import React, { useEffect, useState } from 'react';
import API_URL from '../../apiConfig';
import { useParams } from 'react-router-dom';
import Comments from '../Comments/Comments';
import { CardActionArea, Card, CardContent, CardMedia, Typography, Container, } from '@mui/material';

function BookDetail({ logInStatus, userData }) {
	const { id } = useParams();
	const [bookData, setBookData] = useState(null);
	useEffect(() => {
		getSpecificBook();
		return () => {
			setBookData(null);
		};
		//eslint-disable-next-line
	}, [id]);

	// Call to our API to get detailed book info
	async function getSpecificBook() {
		try {
			const res = await fetch(`${API_URL.url}books/${id}`);
			const data = await res.json();
			setBookData(data);
		} catch (error) {
			console.log(error);
		}
	}

	if (!bookData) return null;

	return (
		<>
			<Container maxWidth="md" sx={{ display: 'flex'}}>
				<Card
					sx={{ maxWidth: '70%', border: 2, borderColor: 'grey.500', }}
					className='m-auto'>
					<CardActionArea>
						<CardMedia
							component='img'
							height='30%'
							image={bookData.image}
							alt={bookData.title}
						/>
						<CardContent>
							<Typography gutterBottom variant='h5' component='div'>
								{bookData.title}
							</Typography>
							<Typography variant='body1'>by: {bookData.author}</Typography>
							<Typography variant='body2' color='text.secondary'>
								{bookData.description}
							</Typography>
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
