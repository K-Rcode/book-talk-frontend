import React, { useEffect, useState } from 'react';
import API_URL from '../../apiConfig';
import { useParams } from 'react-router-dom';
import Comments from '../Comments/Comments';
// import style from './bookDetail.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

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
			<div className='card-container'>
				<Card
					sx={{ maxWidth: 600, border: 2, borderColor: 'grey.500' }}
					className='m-auto'>
					<CardActionArea>
						<CardMedia
							component='img'
							height=''
							width=''
							image={bookData.image}
							alt={bookData.title}
						/>
						<CardContent>
							<Typography gutterBottom variant='h5' component='div'>
								{bookData.title}
								{/* <br></br> */}
							</Typography>
							<Typography variant='body1'>by: {bookData.author}</Typography>
							<Typography variant='body2' color='text.secondary'>
								{bookData.description}
							</Typography>
						</CardContent>
					</CardActionArea>
				</Card>
			</div>
			<Comments
				id={id}
				comments={bookData.comments}
				logInStatus={logInStatus}
				userData={userData}
				getSpecificBook={getSpecificBook}
			/>
		</>
	);
}

export default BookDetail;
