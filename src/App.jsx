import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Navbar/Navbar'
import IndexPage from './pages/IndexPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar></Navbar>

      <div className="">
        <BrowserRouter>
          <Routes>

            <Route index element={<IndexPage />} className="indexContainer"></Route>
            <Route path="/index" element={<IndexPage />}></Route>
            {/* <Route path='/movies' element={<LogInPage />}></Route>
            <Route path='/authors' element={<GamesPage />}></Route> */}

            {/* Creating a game info route for all the games */}
            {/* {data.map(game => <Route path={`/${game.game_title}`} element={<GameInfo game={game} />}></Route>)} */}

          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
