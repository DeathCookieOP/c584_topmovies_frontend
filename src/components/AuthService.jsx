import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(undefined)

export const useAuth = () => {
    const authContext = useContext(AuthContext)

    if (!authContext) {
        throw new Error('error in auth')
    }
    return authContext;
}

const AuthService = ({ children }) => {
    const [token, setToken] = useState()

    const login = async (username, password) => {
        try {
            const response = await fetch('https://localhost:7186/api/Admin/Login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Login failed 😭');
            }

            const data = await response.json();

            if (data.success) {
                setToken(data.token);
                localStorage.setItem("LoginToken", data.token)
                console.log('Login successful 👏: ', data.token);
            } else {
                throw new Error(data.message || 'Login unsuccessful');
            }
        } catch (error) {
            console.error(error.message);
            setToken(null);
        }
    };

    function isAuthenticated() {
        return localStorage.getItem("LoginToken") !== null
    }

    const logout = () => {
        setToken(null);
        localStorage.removeItem("LoginToken");
    };

    function getToken() {
        return localStorage.getItem("LoginToken")
    }


    return (
        <AuthContext.Provider value={{ token, login, logout, isAuthenticated, getToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthService;