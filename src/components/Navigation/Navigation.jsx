import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import About from '../About/About';

function Navigation({ handleLogout, userData, logInStatus }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <nav>
            <ul>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li onClick={handleShow}>About</li>
                {logInStatus ? (
                    <>
                        <li>
                            <Link to='/new-book'>Add Book</Link>
                        </li>
                        <li>
                            <Button variant="secondary" onClick={handleLogout}>Log Out</Button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to='login'>Login</Link>
                        </li>
                        <li>
                            <Link to='/signup'>Sign Up</Link>
                        </li>
                    </>
                )}

            </ul>
            {show && (
                <About handleClose={handleClose} handleShow={handleShow} show={show} />
            )}
        </nav>
    );
}

export default Navigation;
