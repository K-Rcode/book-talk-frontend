import React, { useEffect, useState } from 'react';
import API_URL from '../../apiConfig';
import { useParams } from 'react-router-dom';
import Comments from '../Comments/Comments';

function BookDetail(props) {
	const { id } = useParams();
	const [bookData, setBookData] = useState(null);
	useEffect(() => {
		getSpecificBook();
	}, []);

	// Call to our API to get detailed book info
	async function getSpecificBook() {
		try {
			const res = await fetch(`${API_URL.url}books/${id}`);
			const data = await res.json();
			setBookData(data);
		} catch (error) {
			// console.log(error)
		}
	}

	if (!bookData) return null;

	return (
		<>
			<h2>{bookData.title}</h2>
			<p>by: {bookData.author}</p>
			<div className='book-detail-container'>
				<div className='book-detail'>
					<img src={bookData.image} alt={bookData.title} />
					<p>{bookData.category}</p>
					<p>{bookData.description}</p>
				</div>
				<p>This conversation started by: {bookData.owner}</p>
				<Comments comments={bookData.comments} />
			</div>
		</>
	);
}

export default BookDetail;
