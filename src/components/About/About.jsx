import Modal from 'react-bootstrap/Modal';

function About({ handleClose, show }) {
	return (
		<>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title> Welcome to Book Talk!</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Book Talk is a virtual book club. Search and add a new book to start a
					new conversation or join in an ongoing conversation. Enjoy!
				</Modal.Body>
			</Modal>
		</>
	);
}

export default About;
