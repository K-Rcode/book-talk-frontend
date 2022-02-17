import React from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
// import axios from 'axios';
import API_URL from '../../apiConfig';

function NotFoundModal(props) {
  const navigate = useNavigate()
  const handleAddBookClick = () => {
    createBook()
  }

  const createBook = async () => {
    let book = {
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
    // const res = await axios.post(`${API_URL.url}books/`, book, {
    //   headers: {
    //     Authorization: `Token ${localStorage.getItem('token')}`,
    //   },
    // })

    const res = await fetch(`${API_URL.url}books/`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(book)
      })
    console.log(res)
    setTimeout(() => {
      if (res.status === 201) {
        fetch(`${API_URL.url}books/?search=${props.currentpick.id}`)
          .then(res => res.json())
          .then(res => {
            console.log(res[0].id)
            // navigate(`/book/${res[0].id}`)
            navigate('/')
          })
        console.log()
      }
        
      }, 2500)

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