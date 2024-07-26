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
import DichVuListing from './components/dichVu/DichVuListing';
import DSBangGia from './components/bangGia/DSBangGia';
import EditBangGia from './components/bangGia/EditBangGia';
import ThueCanHo from './components/hopDong/ThueCanHo';
import XemCanHo from './components/hopDong/XemCanHo';
import DangKyDichVu from './components/hopDong/DangKyDichVu';
import DSHoaDon from './components/hoaDon/DSHoaDon';
import DSHopDong from './components/hopDong/DSHopDong';
import XemDichVu from './components/hopDong/XemDichVu';
import ThongKeHoaDon from './components/hoaDon/ThongKeHoaDon';
import DSHopDongBQL from './components/hopDongBanQuanLy/DSHopDongBQL';
import BQLXemCanHo from './components/hopDongBanQuanLy/BQLXemCanHo';
import BQLXemDichVu from './components/hopDongBanQuanLy/BQLXemDichVu';
import Login from './components/nguoidung/Login';
import Register from './components/nguoidung/Register';
import AuthProvider from './components/nguoidung/AuthProvider';
import QuanLy from './components/banQuanLy/QuanLy';
import {RequireLogin,RequireAdmin, RequireQuanLy} from './components/nguoidung/RequireLogin';
import DSTaiKhoan from './components/taikhoan.jsx/DSTaiKhoan';
import EditTaiKhoan from './components/taikhoan.jsx/EditTaiKhoan';
import ForgotPassword from './components/nguoidung/ForgotPassword';
function App() {
  
  return (
    <>
    <AuthProvider>
      <main>
        <Router>
          <NavBar/>
          <Routes>
            {/* khongquyen */}
            <Route path="/" element={<Home/>}/>
            <Route path="/profile" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/forgot" element={<ForgotPassword/>}/>
            <Route path="/canho" element={<CanHoListing/>}/>
            <Route path="/dichvu" element={<DichVuListing/>}/>
            {/* khachhang */}
            <Route path="/canho/thue/:idCanHo" element={
              <RequireLogin><ThueCanHo/></RequireLogin>}/>
            <Route path="/dichvu/dangky/:idDichVu" element={
              <RequireLogin><DangKyDichVu/></RequireLogin>}/>
              <Route path="/canho/xem/:idHopDong" element={
                <RequireLogin><XemCanHo/></RequireLogin>}/>
            <Route path="/dichvu/xem/:idYeuCauDichVu" element={
              <RequireLogin><XemDichVu/></RequireLogin>}/>
            <Route path="/hopdong" element={<RequireLogin><DSHopDong/></RequireLogin>}/>
            <Route path="/hoadon" element={<RequireLogin><DSHoaDon/></RequireLogin>}/>
            
            {/* admin */}
            <Route path="/admin" element={<RequireAdmin><Admin/></RequireAdmin>}/>
            <Route path="/ds-taikhoan" element={<RequireAdmin><DSTaiKhoan/></RequireAdmin>}/>
            <Route path="/edit-taikhoan/:role/:tenDangNhap" element={
              <RequireAdmin><EditTaiKhoan/></RequireAdmin>}/>
            {/* banquanly */}
            <Route path="/banquanly" element={<QuanLy/>}/>
            <Route path="/ds-canho" element={<DSCanHo/>}/>
            <Route path="/edit-canho/:idCanHo" element={<EditCanHo/>}/>
            <Route path="/ds-dichvu" element={<DSDichVu/>}/>
            <Route path="/edit-dichvu/:idDichVu" element={<EditDichVu/>}/>
            <Route path="/ds-banggia" element={<DSBangGia/>}/>
            <Route path="/edit-banggia/:idBangGia" element={<EditBangGia/>}/>
            <Route path="/ds-hopdong" element={<DSHopDongBQL/>}/>
            <Route path="/canho/bqlxem/:idHopDong" element={<BQLXemCanHo/>}/>
            <Route path="/dichvu/bqlxem/:idYeuCauDichVu" element={<BQLXemDichVu/>}/>
            <Route path="/tk-hoadon" element={<ThongKeHoaDon/>}/>
            
          </Routes>
        </Router>
        <Footer/>
      </main>
      </AuthProvider>
    </>
  )
}

export default App
