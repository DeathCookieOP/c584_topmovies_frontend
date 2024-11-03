import { Box, boxClasses } from '@mui/material'
import React from 'react'
import styles from './Navbar.module.css'

function Navbar() {
    const path = window.location.pathname;

    const navStyle = {
        width: "100%",
        display: "flex",
        alignItems: "stretch",
        justifyContent: "center",
        backgroundColor: "white",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        backgroundColor: "#606060",
        zIndex: 1000
    }

    return (
        <nav style={navStyle}>

            {/* <img src={logo} alt="" className="logo"/> */}

            <ul>
                <li className={path === '/' ? styles.active : ''}><a href="/" style={{ textShadow: "rgba(9, 0, 255, 0.43) 0px 0px 38px" }}>Home</a></li>
                <li className={path === '/movies' ? styles.active : ''}><a href="/movies">Movies</a></li>
            </ul>
        </nav>
    )
}

export default Navbar
