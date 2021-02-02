import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import { Container } from '@material-ui/core';
import { Link } from 'react-router-dom';


const Navbar = () => {    
    return (        
        <nav className="navbar bg-dark">
            <Link to='/'>
                <h1>
                G-Mag
                </h1>
            </Link>
            <ul>
                <li><Link to="/login">Sign In</Link></li>
                <li><Link to="/register">Sign Up</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar