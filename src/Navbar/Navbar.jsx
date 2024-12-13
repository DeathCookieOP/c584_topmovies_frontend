import { Box, boxClasses } from '@mui/material'
import React from 'react'
import styles from './Navbar.module.css'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthService';

function Navbar() {
    const path = window.location.pathname;

    const navStyle = {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#606060",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
        padding: "0 2rem"
    };

    const ulStyle = {
        display: "flex",
        listStyle: "none",
        margin: 0,
        padding: 0,
        gap: "2rem"
    };

    const { isAuthenticated, logout } = useAuth()
    const navigate = useNavigate()

    function handleLogout() {
        logout()
        navigate('/')
    }

    return (
        <nav style={navStyle}>

            {/* <img src={logo} alt="" className="logo"/> */}

            <ul style={ulStyle}>
                <li className={path === '/' ? styles.active : ''}>
                    <Link to="/">Home</Link>
                </li>

                <li className={path === '/movies' ? styles.active : ''}>
                    <Link to="/movies">Movies</Link>
                </li>

                <li className={path === '/login' ? styles.active : ''}>
                    {isAuthenticated() ? (
                        <Link to="" onClick={handleLogout}>Logout</Link>
                    ) : (
                        <Link to="/login">Login</Link>
                    )}

                </li>
            </ul>
        </nav>
    )
}

export default Navbar
