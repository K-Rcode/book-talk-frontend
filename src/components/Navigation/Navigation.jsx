import { useState } from 'react';
import { Nav } from 'react-bootstrap';
import About from '../About/About';

function Navigation({ handleLogout, userData, logInStatus }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <nav>
            <Nav defaultActiveKey="/home" as="ul">
                <Nav.Item as="li">
                    <Nav.Link href='/'>Home</Nav.Link>
                </Nav.Item>
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
            {show && (
                <About handleClose={handleClose} handleShow={handleShow} show={show} />
            )}
        </nav>
    );
}

export default Navigation;
