import { useState } from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';
import About from '../About/About';

import book from '../assets/bookLogo.jpeg'

function Navigation({ handleLogout, userData, logInStatus }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
                <Navbar  style={{ marginBottom: '5%',}}>
                <Container>
                    <Navbar.Brand href="/">
                        <img
                        alt="Book Talk"
                        src={book}
                        width="40"
                        height="40"
                        className="d-inline-block align-top"
                        />{' '}
                        Book Talk
                    </Navbar.Brand>
                <Nav defaultActiveKey="/home" as="ul" >
                <Nav.Item as="li" onClick={handleShow}>
                    <Nav.Link eventKey="about">About</Nav.Link>
                </Nav.Item>
                {logInStatus ? (
                    <>
                        <Nav.Item as="li">
                            <Nav.Link eventKey="add-book" href='/new-book'>Add Book</Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li">
                            <Nav.Link eventKey="log-out" onClick={handleLogout}>Log Out</Nav.Link>
                        </Nav.Item>
                    </>
                ) : (
                    <>
                        <Nav.Item as="li">
                            <Nav.Link eventKey="log-in" href='/login'>Login</Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li">
                            <Nav.Link eventKey="signup" href='/signup'>Sign Up</Nav.Link>
                        </Nav.Item>
                    </>
                )}
                    </Nav>
                    </Container>
                </Navbar>
            {show && (
                <About handleClose={handleClose} handleShow={handleShow} show={show} />
            )}
        </>
    );
}

export default Navigation;
