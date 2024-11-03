import React, { useEffect, useState } from 'react'


function MoviesPage() {

    const [movieData, setMovieData] = useState([])

    useEffect(() => {
        fetch('https://localhost:7186/api/Movies')
            .then(response => response.json())
            .then(movieData => setMovieData(movieData))
            .catch(err => console.log(err))
    }, [])

    const imageStyle = {
        height: "250px",
    }

    const centerText = {
        display: "flex",
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

    return (
        <>
            <div style={centerText}>
                <h1>Ronny's Top 10 Movies</h1>
            </div>

            <div style={movieCard}>
                {movieData.map(movie =>
                    <div key={movie.id}>
                        <img src={movie.movieImage} style={imageStyle} />
                        <p>{movie.title}</p>
                        <a href={`/${movie.companyName}`}><p>{movie.companyName}</p></a>
                    </div>
                )}
            </div>
        </>
    )
}

export default MoviesPage
