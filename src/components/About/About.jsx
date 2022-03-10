import {Modal, Stack} from 'react-bootstrap';


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
				<h3 style={{textAlign: 'center'}}>Development Team</h3>
				<Stack direction="horizontal" gap={3} className='about-img'>
				<div>
						<a
							className='linkedIn'
							target='_blank'
							rel='noreferrer'
							href='https://www.linkedin.com/in/ray-haynes/'>
							<img
								className='headshotImg'
								src='https://ca.slack-edge.com/T0351JZQ0-U02LLLN9U58-b2a439a24029-192'
								alt='Ray'
							/>
						</a>
						<h4>Ray Haynes</h4>
				</div>
				<div>
						<a
							className='linkedIn'
							target='_blank'
							rel='noreferrer'
							href='https://www.linkedin.com/in/keisha-gittens/'>
							<img
								className='headshotImg'
								src='https://media-exp1.licdn.com/dms/image/C4D03AQE3qA2WbP184w/profile-displayphoto-shrink_400_400/0/1639697633507?e=1651708800&v=beta&t=E3GDKooMmEVuitMTFog7hu2O_ZrZUUmyhi9eIBW5obw'
								alt='Keisha'
							/>
						</a>
						<h4>Keisha Gittens</h4>
					</div>
					</Stack>
			</Modal>
		</>
	);
}

export default About;
