import React from 'react';
import { Link } from "react-router-dom";

function Navigation(props) {
    return (
        <nav>
            <ul>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/about'>About</Link>
                </li>
                <li>
                    <Link to='/new-book'>Add Book</Link>
                </li>
                <li>
                    <Link to='login'>Login/Signup</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;