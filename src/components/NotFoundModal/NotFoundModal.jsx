import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'

function NotFoundModal(props) {
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
                  Currently, no one is talking about this book. Would you like to start the conversation? 
                  {/* If user picks yes, we want to add the book to our database, and take the user to the newly created book detail page. If they click 'keep searching', just close the modal. */}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}


export default NotFoundModal;