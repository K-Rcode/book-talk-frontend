import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import API_URL from '../../apiConfig';
import axios from 'axios';

function CreateUser(props) {
	const blankFormData = {
		email: '',
		username: '',
		password: '',
		re_password: '',
	};
	const navigate = useNavigate();
	const [formData, setFormData] = useState(blankFormData);
	const [noMatch, setNoMatch] = useState(false);
	const [success, setSuccess] = useState(false);

	function handleChange(event) {
		setFormData({ ...formData, [event.target.name]: event.target.value });
	}

	function checkMatchPword() {
		if (formData.password !== formData.re_password) {
			setNoMatch(true);
			return true;
		} else {
			return false;
		}
	}

	async function createUser(event) {
		event.preventDefault();
		checkMatchPword();

		try {
			const res = await axios.post(`${API_URL.url}users/`, formData);
			if (res.status === 201) {
				setSuccess(true);
				setTimeout(() => {
					navigate('/login');
				}, 3000);
			}
		} catch (error) {
			
		}
	}

	return (
		<>
			<h2>Welcome to Book Talk</h2>
			<p>create an account to join the conversations</p>
			<Form onSubmit={createUser}>
				<Form.Group className='mb-3' controlId='formBasicEmail'>
					<Form.Label>Email address</Form.Label>
					<Form.Control
						type='email'
						placeholder='Enter email'
						value={formData.email}
						name='email'
						onChange={handleChange}
					/>
					<Form.Text className='text-muted'>
						We'll never share your email with anyone else.
					</Form.Text>
				</Form.Group>
				<Form.Group className='mb-3' controlId='username'>
					<Form.Label>Username</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter username'
						name='username'
						value={formData.username}
						onChange={handleChange}
					/>
					<Form.Text className='text-muted'>
						Required. 150 characters or fewer. Letters, digits and @/./+/-/_
						only.
					</Form.Text>
				</Form.Group>

				<Form.Group className='mb-3' controlId='formBasicPassword'>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Enter password'
						name='password'
						value={formData.password}
						onChange={handleChange}
					/>
				</Form.Group>
				<Form.Group className='mb-3' controlId='confirm_pword'>
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Re-type password'
						name='re_password'
						value={formData.re_password}
						onChange={handleChange}
					/>
				</Form.Group>
				<Button variant='secondary' type='submit'>
					Submit
				</Button>
				{noMatch && <Alert variant='danger'>Passwords must match!</Alert>}
				{success && (
					<Alert variant='success' className='mt-5'>
						User successfully created! You will be redirected to log in. If not
						automatically redirected, please click{' '}
						{<Link to='/login'>here</Link>}.
					</Alert>
				)}
			</Form>
		</>
	);
}

export default CreateUser;
