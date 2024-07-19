import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import DSCanHo from './components/canHo/DSCanHo';
import Home from './components/home/Home'
import EditCanHo from './components/canHo/EditCanHo'
import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';
import CanHoListing from './components/canHo/CanHoListing';
import Admin from './components/admin/Admin';
import DSDichVu from './components/dichVu/DSDichVu';
import EditDichVu from './components/dichVu/EditDichVu';
import DSBangGia from './components/bangGia/DSBangGia';
import EditBangGia from './components/bangGia/EditBangGia';
function App() {
  
  return (
    <>
      <main>
        <Router>
          <NavBar/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/ds-canho" element={<DSCanHo/>}/>
            <Route path="/edit-canho/:idCanHo" element={<EditCanHo/>}/>
            <Route path="/ds-dichvu" element={<DSDichVu/>}/>
            <Route path="/edit-dichvu/:idDichVu" element={<EditDichVu/>}/>
            <Route path="/ds-banggia" element={<DSBangGia/>}/>
            <Route path="/edit-banggia/:idBangGia" element={<EditBangGia/>}/>
            <Route path="/canho" element={<CanHoListing/>}/>
            <Route path="/admin" element={<Admin/>}/>
            <Route path="/hopdong" element={<Home/>}/>
            <Route path="/login" element={<Home/>}/>
            <Route path="/logout" element={<Home/>}/>
            <Route path="/profile" element={<Home/>}/>
          </Routes>
        </Router>
        <Footer/>
      </main>
    </>
  )
}

export default App
