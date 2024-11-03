import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Navbar/Navbar'
import IndexPage from './pages/IndexPage'
import MoviesPage from './pages/MoviesPage'
import ProducerPage from './pages/ProducerPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)
  const [movieData, setMovieData] = useState([])
  const [producerCompanyData, setProducerCompanyData] = useState([])

  useEffect(() => {
    fetch('https://localhost:7186/api/Movies')
      .then(response => response.json())
      .then(movieData => setMovieData(movieData))
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    fetch('https://localhost:7186/api/ProducerCompanies')
      .then(response => response.json())
      .then(producerCompanyData => setProducerCompanyData(producerCompanyData))
      .catch(err => console.log(err))
  }, [])

  return (
    <>
      <Navbar></Navbar>

      <div className="container">
        <BrowserRouter>
          <Routes>

            <Route index element={<IndexPage />} className=""></Route>
            <Route path="/index" element={<IndexPage />}></Route>
            <Route path='/movies' element={<MoviesPage />}></Route>

            {/* Creating a route for each of the producers */}
            {producerCompanyData.map(prodCompany => <Route path={`/${prodCompany.name}`} key={prodCompany.id} element={<ProducerPage prodCompany={prodCompany} />}></Route>)}

          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
