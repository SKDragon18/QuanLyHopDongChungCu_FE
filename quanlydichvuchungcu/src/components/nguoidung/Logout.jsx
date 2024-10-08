import React, { useContext, useState } from 'react'
import { AuthContext } from './AuthProvider'
import { Link, useNavigate } from 'react-router-dom'

const Logout = () => {
  const auth = useContext(AuthContext)
    const navigate = useNavigate()
    const [tenDangNhap] = useState(localStorage.getItem("tenDangNhap"))
    const [role] = useState(localStorage.getItem("role"))
    const handleLogout = ()=>{
        auth.handleLogout()
        // window.location.reload()
        navigate("/",{state:{message:"Bạn đã đăng xuất"}})
    }
    return (<>
        <li>
            <text className='dropdown-item text-primary'>Username: {tenDangNhap}</text>
        </li>
        <li>
            <text className='dropdown-item text-primary'>Role: {role}</text>
        </li>
        <li>
            <Link className='dropdown-item' to={`/profile/${tenDangNhap}`}>
                Thông tin cá nhân
            </Link>
        </li>
        <li>
            <Link className='dropdown-item' to={'/changepassword'}>
                Đổi mật khẩu
            </Link>
        </li>
        <li>
            <hr className='dropdown-divider'/>
        </li>
        <button className='dropdown-item' onClick={handleLogout}>
            Thoát
        </button>
        </>
    )
}

export default Logout
