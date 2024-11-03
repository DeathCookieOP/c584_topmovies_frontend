import React, { useEffect, useState } from 'react'


function MoviesPage() {

    const [movieData, setMovieData] = useState([])

    useEffect(() => {
        fetch('https://localhost:7186/api/Movies')
            .then(response => response.json())
            .then(movieData => setMovieData(movieData))
            .catch(err => console.log(err))
    }, [])



    return (
        <>
            <div>
                <h1>Ronny's Top 10 Movies</h1>
            </div>

            <div>
                {movieData.map(movie =>
                    <div key={movie.id}>
                        <p>{movie.title}</p>
                        <a href={`/${movie.companyName}`}><p>{movie.companyName}</p></a>
                        <img src={movie.movie_img} />
                    </div>
                )}
            </div>
        </>
    )
}

export default MoviesPage
