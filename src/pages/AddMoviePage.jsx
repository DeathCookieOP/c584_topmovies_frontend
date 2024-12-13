import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthService';

function AddMoviePage() {
    const divHolder = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "calc(100vh - 64px)",
        flexDirection: "column",
        marginTop: "-20px"
    }

    const formStyle = {
        width: "100%",
        maxWidth: "500px",
        textAlign: "center"
    }

    const inputStyle = {
        width: "100%",
        padding: "8px 12px",
        margin: "8px 0",
        borderRadius: "4px",
        border: "2px solid #ddd",
        fontSize: "16px",
    }

    const textAreaStyle = {
        ...inputStyle,
        minHeight: "150px",
        resize: "vertical"
    }

    const submitButton = {
        backgroundColor: "green",
        color: "white",
        padding: "10px 20px",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "16px",
        marginTop: "20px"
    }

    const labelStyle = {
        fontSize: "20px",
        marginBottom: "5px",
        display: "block",
        textAlign: "left",
        marginTop: "15px"
    }

    const [producerCompanyData, setProducerCompanyData] = useState([])
    const [title, setTitle] = useState('')
    const [rating, setRating] = useState('')
    //defauly image
    const [movieImage, setmovieImage] =
        useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnfjjzptc8ScHH5YruKjXaJpe8jpV9wxc1zQ&s')
    const [description, setDescription] = useState('')
    const [releaseDate, setReleaseDate] = useState('')
    const [company, setCompany] = useState('');

    const { getToken } = useAuth()


    useEffect(() => {
        fetch('https://localhost:7186/api/ProducerCompanies')
            .then(response => response.json())
            .then(producerCompanyData => setProducerCompanyData(producerCompanyData))
            .catch(err => console.log(err))
    }, [])

    const navigate = useNavigate()

    const token = getToken()

    const postMovieData = async (title, movieImage, company, rating, description, releaseDate) => {
        //needed to add a DTO for the frontend to POST movies 
        try {
            const movieData = {
                title,
                movieImage,
                rating: Number(rating),
                description,
                releaseDate,
                companyId: company.id,
            }


            console.log('Sending this data:', movieData);

            const response = await fetch('https://localhost:7186/api/Movies', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(movieData),
            });

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(`Problem posting movie to db: ${errorData}`);
            }
        }
        catch (error) {
            console.error('err:', error);
            throw error;
        }
    };

    const handlePostMovie = async (e) => {
        e.preventDefault()
        try {
            //go to db and send POST the data
            await postMovieData(title, movieImage, company, rating, description, releaseDate)
            console.log(`Title: ${title}; \nRating: ${rating}; \nImage URL: ${movieImage};
                \nDescription: ${description}; \n Release releaseDate: ${releaseDate}; \nProduction Company: ${company}`)
            navigate('/movies');
        } catch (error) {
            console.error('Submission failed:', error.message)
            alert('Failed to submit movie. Please try again.')
        }
    };

    return (
        <div style={divHolder}>
            <form onSubmit={handlePostMovie} style={formStyle}>
                <h2 style={{ fontSize: "32px", marginBottom: "30px" }}>Add A New Movie!</h2>

                <label style={labelStyle}>Movie Title</label>
                <input type="text" name="title" value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter movie title" style={inputStyle} required
                />

                <label style={labelStyle}>Rating</label>
                <input type="number" name="rating" min="0" max="10"
                    step="0.1" value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    placeholder="Enter rating (0-10)" style={inputStyle} required
                />

                <label style={labelStyle}>Movie Poster URL (autofilled with 404 image)</label>
                <input type="url" name="posterImage" value={movieImage}
                    onChange={(e) => setmovieImage(e.target.value)}
                    placeholder="Enter poster image URL" style={inputStyle}
                />

                <label style={labelStyle}>Description</label>
                <textarea name="description" value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter movie description" style={textAreaStyle} required
                />

                <label style={labelStyle}>Release releaseDate</label>
                <input type="date" name="releasereleaseDate" value={releaseDate}
                    onChange={(e) => setReleaseDate(e.target.value)}
                    style={inputStyle} required
                />

                <label style={labelStyle}>Production Company</label>
                <select
                    name="company"
                    value={company ? company.id : ''}
                    onChange={(e) => {
                        const selectedCompany = producerCompanyData.find(c => c.id === Number(e.target.value));
                        setCompany(selectedCompany);
                    }}
                    style={inputStyle}
                    required
                >
                    <option value="">Select a company</option>
                    {producerCompanyData.map((company) => (
                        <option key={company.id} value={company.id}>
                            {company.name}
                        </option>
                    ))}
                </select>
                <p>Company you want not here? <button><Link to="/add-company">Add it!</Link></button></p>

                <button type="submit" style={submitButton}>
                    Submit Movie
                </button>
            </form>
        </div>
    );
}

export default AddMoviePage;