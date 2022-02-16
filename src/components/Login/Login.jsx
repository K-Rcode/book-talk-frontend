import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import API_URL from '../../apiConfig';
import axios from 'axios';

function Login({ handleSetLogIn }) {
    const [formState, setFormState] = useState({
        username: '',
        password: ''
    });
    // const [error, setError] = useState(false);
    const navigate = useNavigate();


    const _handleLogin = (e) => {
        e.preventDefault()
        axios.post(`${API_URL.url}token/login/`,  formState )
            .then(res => {
                if (res.status === 200) {
                    handleSetLogIn(res.data.auth_token)
                    navigate('/')
                } else {
                    console.log('hi')
                    // setError(true)
                }
        })
    }

    const handleChange = (e) => {
        setFormState({...formState, [e.target.id]: e.target.value })
    }

    return (
		<div>
			<h2>Log in</h2>
			<Form onSubmit={_handleLogin}>
				<Form.Group controlId='username'>
					<Form.Label>Username</Form.Label>
                    <Form.Control
                        // size='sm'
						required
                        // className='m-4 w-50'
						autoFocus
						type='text'
						value={formState.username}
						onChange={handleChange}
					/>
				</Form.Group>
				<Form.Group controlId='password'>
					<Form.Label>Password</Form.Label>
					<Form.Control
                        required
                        // className='m-4 w-75'
						type='password'
						value={formState.password}
						onChange={handleChange}
					/>
				</Form.Group>
				<Button type='submit' variant="secondary">Login</Button>
			</Form>
		</div>
    );
}

export default Login;