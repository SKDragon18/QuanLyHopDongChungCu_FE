import React from 'react'
import { Card, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import apartment from '../../assets/images/apartment.png'
const CanHoCard = ({canHo}) => {
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
    <Col key={canHo.id} className='mb-4' xs={12} >
      <Card>
        <Card.Body className='d-flex flex-wrap align-items-center'>
            {(canHo.hinhAnhList.length>0)?
            (<div className='flex-shrink-0 mr-3 mb-3 md-md-0'>
                <Card.Img
                variant='top'
                src={`data:image/png;base64, ${canHo.hinhAnhList[0]}`}
                alt='Hình căn hộ'
                style={{width:'100%', maxWidth:'200px', height:'auto'}}/>
            </div>)
            :(<div className='flex-shrink-0 mr-3 mb-3 md-md-0'>
              <Card.Img
              variant='top'
              src={apartment}
              alt='Hình căn hộ'
              style={{width:'100%', maxWidth:'200px', height:'auto'}}/>
          </div>)
            }
            <div className='flex-grow-1 ml-3 px-5'>
                <Card.Title className='hotel-color'>Căn hộ {canHo.soPhong} tầng {canHo.tang} khu {canHo.lo}</Card.Title>
                <Card.Title className='room-price'>{formatCurrency(canHo.giaThue,'vi-VN', 'VND')}/ {canHo.chuKy} ngày</Card.Title>
                <Card.Text>{truncateText(canHo.moTa,200)}</Card.Text>
            </div>
            <div className='flex-shrink-0 mt-3'>
                <Link to={`thue/${canHo.idCanHo}`} className='btn btn-hotel btn-sm'>
                    Thuê ngay
                </Link>
            </div>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default CanHoCard
