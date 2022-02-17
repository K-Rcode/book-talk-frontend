import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import API_URL from '../../apiConfig';

function NotFoundModal(props) {
  const handleAddBookClick = () => {
    createBook()
  }

  const createBook = async () => {
    let book = await {
      title: props.currentpick.volumeInfo.title,
      author: props.currentpick.volumeInfo.authors[0],
      image: props.currentpick.volumeInfo.imageLinks.thumbnail,
      category: props.currentpick.volumeInfo.categories[0],
      description: props.currentpick.volumeInfo.description,
      publisher: props.currentpick.volumeInfo.publisher,
      published_date: props.currentpick.volumeInfo.publishedDate,
      google_id: props.currentpick.id,
      preview_link: props.currentpick.volumeInfo.previewLink
    }
    const res = await axios.post(`${API_URL.url}books/`, book, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    })
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body>
        <h4>Start the converstaion!</h4>
        <p>
                  What a shame. Currently, there's no talk on our site about this book. Would you like to start the conversation? 
                  {/* If user picks yes, we want to add the book to our database, and take the user to the newly created book detail page. If they click 'keep searching', just close the modal. */}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleAddBookClick}>Yes!</Button>
        <Button onClick={props.onHide}>Keep Searching</Button>
      </Modal.Footer>
    </Modal>
  );
}


export default NotFoundModal;