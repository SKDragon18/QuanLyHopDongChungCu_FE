import React from 'react'
import { Card, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import service from '../../assets/images/service.jpg'
const DichVuCard = ({dichVu}) => {
  const truncateText = (text, maxLength)=>{
    if(text===null||text==='')return 'Không mô tả'
    if(text.length <=maxLength){
      return text
    }
    return text.slice(0, maxLength) + '...'
  }
  const formatCurrency = (value, locale = 'en-US', currency = 'USD') => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
    }).format(value);
  };
  
  return (
    <Col key={dichVu.idDichVu} className='mb-4' xs={12} >
      <Card>
        <Card.Body className='d-flex flex-wrap align-items-center'>
            <div className='flex-shrink-0 mr-3 mb-3 md-md-0'>
                <Card.Img
                variant='top'
                src={service}
                alt='Hình dịch vụ'
                style={{width:'100%', maxWidth:'200px', height:'auto'}}/>
            </div>
            <div className='flex-grow-1 ml-3 px-5'>
                <Card.Title className='hotel-color'>{dichVu.tenDichVu}</Card.Title>
                <Card.Title className='room-price'>{formatCurrency(dichVu.giaHienTai,'vi-VN', 'VND')}/ {dichVu.chuKy} ngày</Card.Title>
                <Card.Text>{truncateText(dichVu.ghiChu,200)}</Card.Text>
            </div>
            <div className='flex-shrink-0 mt-3'>
                <Link to={`dangky/${dichVu.idDichVu}`} className='btn btn-hotel btn-sm'>
                    Đăng ký ngay
                </Link>
            </div>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default DichVuCard
