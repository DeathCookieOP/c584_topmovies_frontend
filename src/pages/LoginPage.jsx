import { responsiveFontSizes } from '@mui/material';
import { useState, useEffect } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthService';

function LoginPage() {
    const divHolder = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "calc(100vh - 64px)",
        flexDirection: "column",
        marginTop: "-20px"
    }

    const style1 = { color: "white" }

    const submitButton = { backgroundColor: "green" }
    const hrStyle = {
        width: "200px",
        marginTop: "20px"
    }
    const formStyle = {
        width: "100%",
        maxWidth: "300px",
        textAlign: "center"
    }

    const inputStyle = {
        width: "300px",
        padding: "8px 12px",
        margin: "8px 0",
        borderRadius: "4px",
        border: "2px solid #ddd",
        fontSize: "16px",
    }

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(username, password)
            console.log("logged in: " + localStorage.getItem("LoginToken"))

            navigate('/movies')
        } catch (error) {
            console.error('Login failed:', error.message)
            alert('Login failed. Please check your username and password.')
        }
    };


    return (
        <div style={divHolder}>
            <form onSubmit={handleLogin} style={formStyle}>
                <h4 style={{ fontSize: "30px", marginBottom: "10px" }}>User Email</h4>
                <input type="text" name="email"
                    value={username} onChange={(e) => setUsername(e.target.value)}
                    id="userEmail" placeholder="Email" required style={inputStyle} />

                <h4 style={{ fontSize: "30px", marginBottom: "10px" }}>Password</h4>
                <input type="password" name="password"
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    id="userPassword" placeholder="Password" required style={inputStyle} />

                <br /><br />

                <div style={style1}>
                    <button style={submitButton} type="submit">Log in</button>
                </div>
            </form>

            <hr style={hrStyle} />
            <p style={style1}>Don't have an account? <a href="/signup" style={{ color: "rgba(162, 236, 255, 0.87)" }}>Sign Up! (not implemented)</a></p>

        </div>
    );
}

export default LoginPage;