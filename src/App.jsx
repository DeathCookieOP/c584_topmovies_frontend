import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AuthService from './components/AuthService'
import Navbar from './Navbar/Navbar'
import IndexPage from './pages/IndexPage'
import MoviesPage from './pages/MoviesPage'
import ProducerPage from './pages/ProducerPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import AddMoviePage from './pages/AddMoviePage'
import AddCompanyPage from './pages/AddCompanyPage'

function App() {
  const [producerCompanyData, setProducerCompanyData] = useState([])

  useEffect(() => {
    fetch('https://localhost:7186/api/ProducerCompanies')
      .then(response => response.json())
      .then(producerCompanyData => setProducerCompanyData(producerCompanyData))
      .catch(err => console.log(err))
  }, [])

  return (
    <>
      <BrowserRouter>
        <AuthService>
          <Navbar></Navbar>
          <div className="container">
            <Routes>
              <Route index element={<IndexPage />} className=""></Route>
              <Route path="/index" element={<IndexPage />}></Route>
              <Route path='/movies' element={<MoviesPage />}></Route>
              <Route path='/login' element={<LoginPage />}></Route>
              <Route path='/add-movie' element={<AddMoviePage />}></Route>
              <Route path='/add-company' element={<AddCompanyPage />}></Route>

              {/* Creating a route for each of the producers */}
              {producerCompanyData.map(prodCompany => <Route path={`/${prodCompany.name}`} key={prodCompany.id} element={<ProducerPage prodCompany={prodCompany} />}></Route>)}

            </Routes>
          </div>
        </AuthService>
      </BrowserRouter >
    </>
  )
}

export default App
