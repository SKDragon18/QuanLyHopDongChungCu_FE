import React from 'react'
import { Link } from 'react-router-dom'

const QuanLy = () => {
  return (
    <section className='container mt-5'>
      <h2>Trang dành cho ban quản lý</h2>
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
      <hr/>
      <Link to={'/ds-hopdong'}>
      Xem hợp đồng
      </Link>
      <hr/>
      <Link to={'/tk-hoadon'}>
      Thống kê hóa đơn
      </Link>
      <br/>
      <br/>
      <br/>
      <Link to={'/ds-loaiphong'}>
      Xem danh sách loại phòng
      </Link>
      <hr/>
      <Link to={'/ds-dieukhoan'}>
      Xem danh sách điều khoản 
      </Link>
    </section>
  )
}

export default QuanLy
