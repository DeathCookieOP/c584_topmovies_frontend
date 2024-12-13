import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthService';

function AddCompanyPage() {
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

    const [name, setName] = useState('')
    const [companyImage, setCompanyImage] = useState('')
    const [description, setDescription] = useState('')
    const [foundedYear, setFoundedYear] = useState('')

    const { getToken } = useAuth()

    const navigate = useNavigate()

    const token = getToken()

    const postCompanyData = async (name, companyImage, description, foundedYear) => {
        //needed to add a DTO for the frontend to POST movies 
        try {
            const companyData = {
                companyImage,
                name,
                description,
                foundedYear: Number(foundedYear)
            }


            console.log('comp data:', companyData);

            const response = await fetch('https://localhost:7186/api/ProducerCompanies', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(companyData),
            });

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(`Problem posting movie to db: ${errorData}`);
            }
        }
        catch (error) {
            console.error('err: ', error);
            throw error;
        }
    };

    const handlePostCompany = async (e) => {
        e.preventDefault()
        try {
            //go to db and send POST the data
            await postCompanyData(name, companyImage, description, foundedYear)
            navigate('/movies');
        } catch (error) {
            console.error('Submission failed:', error.message)
            alert('Failed to submit movie. Please try again.')
        }
    };

    return (
        <div style={divHolder}>
            <form onSubmit={handlePostCompany} style={formStyle}>
                <h2 style={{ fontSize: "32px", marginBottom: "30px" }}>Add A New Company</h2>

                <label style={labelStyle}>Company Name</label>
                <input type="text" name="name" value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter company name" style={inputStyle} required
                />

                <label style={labelStyle}>Company Logo</label>
                <input type="url" name="companyImage" value={companyImage}
                    onChange={(e) => setCompanyImage(e.target.value)}
                    placeholder="Enter company logo URL" style={inputStyle} required
                />

                <label style={labelStyle}>Description</label>
                <textarea name="description" value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter movie description" style={textAreaStyle} required
                />

                <label style={labelStyle}>Company Founded Year</label>
                <input type="number" name="foundedYear" min="1900" max="2024" step="1"
                    value={foundedYear}
                    onChange={(e) => setFoundedYear(e.target.value)}
                    placeholder="Enter founded year" style={inputStyle} required
                />

                <button type="submit" style={submitButton}>
                    Submit Company
                </button>
            </form>
        </div>
    );
}

export default AddCompanyPage;