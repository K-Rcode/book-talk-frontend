import { useState } from 'react';
import { Link } from 'react-router-dom';
import About from '../About/About';

function Navigation(props) {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<nav>
			<ul>
				<li>
					<Link to='/'>Home</Link>
				</li>
				<li>
					<Link to='/new-book'>Add Book</Link>
				</li>
				<li>
				<li onClick={handleShow}>About</li>
					<Link to='login'>Login/Signup</Link>
				</li>
			</ul>
			{show && (
				<About handleClose={handleClose} handleShow={handleShow} show={show} />
			)}
		</nav>
	);
}

export default Navigation;
