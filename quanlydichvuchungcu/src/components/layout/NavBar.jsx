import React, { useContext, useEffect, useState } from 'react'
import {Link, NavLink} from 'react-router-dom'
import Logout from '../nguoidung/Logout'
import { AuthContext } from '../nguoidung/AuthProvider'
import NotificationComponent from '../notification/NotificationComponent'
import { getAvatar } from '../utils/ApiFunctions'
const NavBar = () => {
    const[showAccount, setShowAccount] = useState(false)
    const[image,setImage] = useState('')
    // const {user} = useContext(AuthContext)
    const handleAccountClick= ()=>{
        setShowAccount(!showAccount)
    }
    console.log(1)
    const tenDangNhap = localStorage.getItem("tenDangNhap")
    const isLoggedIn = localStorage.getItem("token")
    const userRole = localStorage.getItem("role")
    const fetchAvatar= async()=>{
        if(tenDangNhap===null||tenDangNhap==='')return;
        try{
            const result = await getAvatar(tenDangNhap);
            if(result){
                const base64Str = result
                setImage(`data:image/png;base64,${base64Str}`)
            }
        }
        catch(error){
            console.log(error.message)
            setImage('')
        }
    }
    useEffect(()=>{
        fetchAvatar()
    },[tenDangNhap])
  return (
    <nav className='navbar navbar-expand-lg bg-body-tertiary px-5 shadow mt-2 sticky-top'>
        <div className='container-fluid'>
            <Link to={"/"}>
                <span className='hotel-color'>Chung cư cao cấp</span>
            </Link>
            <div className='collapse navbar-collapse' id='navbarScroll'>
                <ul className='navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll'>
                    <li className='nav-item'>
                        <NavLink className='nav-link' aria-current='page' to={'/canho'}>
                            Căn hộ cho thuê
                        </NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink className='nav-link' aria-current='page' to={'/dichvu'}>
                            Dịch vụ chung cư
                        </NavLink>
                    </li>
                    {isLoggedIn&&userRole === "admin" &&(
                        <li className='nav-item'>
                        <NavLink className='nav-link' aria-current='page' to={'/admin'}>
                            Admin
                        </NavLink>
                        </li>
                    )}
                    {isLoggedIn&&userRole === "quanly" &&(
                        <li className='nav-item'>
                        <NavLink className='nav-link' aria-current='page' to={'/banquanly'}>
                            Ban quản lý
                        </NavLink>
                        </li>
                    )}
                    
                </ul>
                <ul className='d-flex navbar-nav'>
                    {isLoggedIn && userRole === "khachhang" &&(
                        <>
                        <li className='nav-item'>
                            <NavLink className='nav-link' aria-current='page' to={'/hopdong'}>
                                Hợp đồng
                            </NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink className='nav-link' aria-current='page' to={'/hoadon'}>
                                Hóa đơn của bạn
                            </NavLink>
                        </li>
                        </>
                    )}
                    {isLoggedIn &&(
                        <li className='nav-item'>
                            <NotificationComponent tenDangNhap={tenDangNhap} role={userRole}/>
                        </li>
                    )}
                    
                    <li className='nav-item dropdown'>
                        <a
                        className={`nav-link dropdown-toggle ${showAccount?'show':''}`}
                        href='#'
                        role='button'
                        data-bs-toggle='dropdown'
                        aria-expanded='false'
                        onClick={handleAccountClick}
                        >
                               {isLoggedIn&&image!==''&&(
                                <img src ={image}
                                alt='Avatar'
                                style={{
                                    maxWidth:"50px", 
                                    maxHeight:"50px", 
                                    marginRight:"8px",
                                    borderRadius:"50%",
                                    objectFit:"cover"}}
                                />)}
                                {" "}
                               Account
                        </a>
                        <ul
                        className={`dropdown-menu ${showAccount?'show':''}`}
                        aria-labelledby='navbarDropdown'>
                            {!isLoggedIn?(
                                <li>
                                    <Link to={'/login'} className='dropdown-item'>
                                        Đăng nhập
                                    </Link>
                                </li>
                            ):(
                            <li>
                                <Logout/>
                            </li>
                            )}
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
  )
}

export default NavBar
