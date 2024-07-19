import React from 'react'
import { Link } from 'react-router-dom'

const Admin = () => {
  return (
    <section className='container mt-5'>
      <h2>Welcome to Admin Panel</h2>
      <hr/>
      <Link to={'/ds-canho'}>
      Quản lý căn hộ
      </Link>
      <hr/>
      <Link to={'/ds-dichvu'}>
      Quản lý dịch vụ
      </Link>
      <hr/>
      <Link to={'/ds-banggia'}>
      Quản lý giá
      </Link>
    </section>
  )
}

export default Admin
