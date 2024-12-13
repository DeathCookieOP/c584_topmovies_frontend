import React, { useEffect, useState } from 'react'
import { useAuth } from '../components/AuthService'
import { Link, redirect, useNavigate } from 'react-router-dom';


function MoviesPage() {

    const imageStyle = {
        height: "250px",
    }

    const centerText = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    }

    const movieCard = {
        height: "400px",
        width: "250px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        justifyContent: "center",
        backgroundColor: "#3d3d3d",
        borderRadius: "10px",
    }

    const container = {
        display: "flex",
        flexWrap: "wrap",
        gap: "20px"
    }

    const [movieData, setMovieData] = useState([])
    const { isAuthenticated, getToken } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/login');
            return;
        }

        const token = getToken()

        fetch('https://localhost:7186/api/Movies', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(movieData => setMovieData(movieData))
            .catch(err => console.log(err))
    }, [navigate, isAuthenticated])


    return (
        <>
            <div style={centerText}>
                <h1>Top Movies</h1>
                <h3 style={{ marginTop: "-20px" }}>Want to add a movie? <button><Link to="/add-movie">Click here!</Link></button></h3>
            </div>


            <div style={container}>
                {movieData.map(movie =>
                    <div style={movieCard} key={movie.id}>
                        <div key={movie.id}>
                            <img src={movie.movieImage} style={imageStyle} />
                            <p>{movie.title}</p>
                            <a href={`/${movie.companyName}`}><p>{movie.companyName}</p></a>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default MoviesPage
