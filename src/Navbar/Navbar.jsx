import { Box, boxClasses } from '@mui/material'
import React from 'react'
import styles from './Navbar.module.css'

function Navbar() {
    const path = window.location.pathname;

    return (
        <nav className={styles.nav}>

            {/* <img src={logo} alt="" className="logo"/> */}

            <ul>
                <li className={path === '/' ? styles.active : ''}><a href="/" style={{ textShadow: "rgba(9, 0, 255, 0.43) 0px 0px 38px" }}>Home</a></li>
                <li className={path === '/login' ? styles.active : ''}><a href="/movies">Movies</a></li>
            </ul>
        </nav>
    )
}

export default Navbar
