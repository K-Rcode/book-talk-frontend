import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import About from './components/About/About';
import BookDetail from './components/BookDetail/BookDetail';
import Booklist from './components/Booklist/Booklist';
import Login from './components/Login/Login';
import NewBook from './components/NewBook/NewBook';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import API_URL from './apiConfig';
import CreateUser from './components/CreateUser/CreateUser';

function App() {
	const [logInStatus, setLogInStatus] = useState(
		localStorage.getItem('token') ? true : false
	);
	const [userData, setUserData] = useState(null);

	useEffect(() => {
		if (logInStatus) {
			getUserData();
		}
	}, [logInStatus]);

	const getUserData = async () => {
		try {
			const res = await fetch(`${API_URL.url}users/me/`, {
				headers: {
					Authorization: `Token ${localStorage.getItem('token')}`,
				},
			});

			if (res.status === 200) {
				const data = await res.json();
				setUserData(data);
			} else {
				setUserData(null);
				setLogInStatus(false);
				localStorage.clear();
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleSetLogIn = (token) => {
		localStorage.setItem('token', token);
		setLogInStatus(true);
	};

	const handleLogout = async () => {
		try {
			const response = await fetch(`${API_URL.url}token/logout`, {
				method: 'POST',
				body: JSON.stringify(localStorage.getItem('token')),
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Token ${localStorage.getItem('token')}`,
				},
			});
			console.log(response);
			if (response.status === 204) {
				setUserData(null);
				setLogInStatus(false);
				localStorage.clear();
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='App'>
			<Navigation
				handleLogout={handleLogout}
				userData={userData}
				logInStatus={logInStatus}
			/>
			<Routes>
				<Route path='/about' element={<About />} />
				<Route
					path='/book/:id'
					element={<BookDetail logInStatus={logInStatus} userData={userData} />}
				/>
				<Route path='/' element={<Booklist />} />
				<Route
					path='/login'
					element={<Login handleSetLogIn={handleSetLogIn} />}
				/>
				<Route
					path='/new-book'
					element={<NewBook logInStatus={logInStatus} />}
				/>
				<Route path='/signup' element={<CreateUser />} />
			</Routes>
		</div>
	);
}

export default App;
