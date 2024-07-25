import React from 'react'
import { Link } from 'react-router-dom'

const Admin = () => {
  return (
    <section className='container mt-5'>
      <h2>Trang dành cho Admin</h2>
      <hr/>
      <Link to={'/ds-taikhoan'}>
      Quản lý tài khoản
      </Link>
    </section>
  )
}

export default Admin
