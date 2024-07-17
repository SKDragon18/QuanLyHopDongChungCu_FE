import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import DSCanHo from './components/room/DSCanHo';
import Home from './components/home/Home'
import EditCanHo from './components/room/EditCanHo'

function App() {
  
  return (
    <>
      <main>
        <Router>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/ds-canho" element={<DSCanHo/>}/>
            <Route path="/edit-canho/:idCanHo" element={<EditCanHo/>}/>
          </Routes>
        </Router>
      </main>
    </>
  )
}

export default App
