import React, { useEffect, useState } from 'react'

function ProducerPage(props) {

    const [producerCompanyData, setProducerCompanyData] = useState([])

    useEffect(() => {
        fetch('https://localhost:7186/api/ProducerCompanies')
            .then(response => response.json())
            .then(producerCompanyData => setProducerCompanyData(producerCompanyData))
            .catch(err => console.log(err))
    }, [])


    return (
        <div>
            <p>{props.prodCompany.name}</p>
            <img src={props.prodCompany.companyImage} alt="" />
        </div>
    )
}

export default ProducerPage
