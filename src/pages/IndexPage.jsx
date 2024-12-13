import React from 'react'

function IndexPage() {

    const indexContainer = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        minWidth: "100vw",
    }

    return (
        <div style={indexContainer}>
            <h1>Top Movies of ALL Time!</h1>
            <p>Discover the top movies that you would recommend to anyone looking for a new show to watch!</p>
            <a href="/movies"><button >Movies</button></a>
        </div>
    )
}

export default IndexPage
