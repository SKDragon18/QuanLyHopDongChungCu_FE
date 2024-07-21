import React, { useEffect, useState } from 'react'
import { getDichVuChoDangKy } from '../utils/ApiFunctions'
import { Link } from 'react-router-dom'
import {Card, Carousel, Col, Container, Row} from 'react-bootstrap'
import service from '../../assets/images/service.jpg'
const DichVuCarousel = () => {
    const [dichVuList, setDichVuList] = useState([{
        idDichVu:0,
        tenDichVu:'',
        ghiChu:'',
        chuKy:0,
        giaHienTai:0,
        giaKhuyenMai:0
    }])
    const [errorMessage,setErrorMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    useEffect(()=>{
        setIsLoading(true)
        getDichVuChoDangKy().then((data)=>{
            const data2 =data.map(item=>({
                ...item,
                giaHienTai:(item.giaKhuyenMai!==null?item.giaKhuyenMai:item.giaHienTai)
            }))
            setDichVuList(data2)
            setIsLoading(false)
        }).catch((error)=>{
            setErrorMessage(error.message)
            setIsLoading(false)
        })
    },[])
    if(isLoading){
        return <div className='mt-5'>Loading...</div>
    }
    if(errorMessage){
        return <div className='text-danger mb-5 mt-5'>Error: {errorMessage}</div>
    }
    const formatCurrency = (value, locale = 'en-US', currency = 'USD') => {
        return new Intl.NumberFormat(locale, {
          style: 'currency',
          currency: currency,
        }).format(value);
      };
  return (
    <section className='bg-light mb-5 mt-5 shadow'>
        <Link to={'/dichvu'} className='hotel-color text-center'>
            Dịch vụ
        </Link>
        <Container>
            <Carousel indicators={false}>
                {[...Array(Math.ceil(dichVuList.length/4))].map((_,index)=>(
                    <Carousel.Item key={index}>
                        <Row>
                            {dichVuList.slice(index*4,index*4 + 4).map((dichVu)=>(
                                <Col key={dichVu.idDichVu} className='mb-4' xs={12} md={6} lg={3}>
                                    <Card>
                                        <Link to={`/dichvu/dangky/${dichVu.idDichVu}`}>
                                            <Card.Img
                                            variant='top'
                                            src={service}
                                            alt='Hình căn hộ'
                                            className='w-100'
                                            style={{height:'200px'}}/>
                                        </Link>
                                        <Card.Body>
                                        <Card.Title className='hotel-color'>{dichVu.tenDichVu}</Card.Title>
                                        <Card.Title className='room-price'>{formatCurrency(dichVu.giaHienTai,'vi-VN', 'VND')}/ {dichVu.chuKy} ngày</Card.Title>
                                        <div className='flex-shrink-0'>
                                            <Link to={`/dichvu/dangky/${dichVu.idDichVu}`} className='btn btn-hotel btn-sm'>
                                                Đăng ký ngay
                                            </Link>
                                        </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Carousel.Item>
                ))}
            </Carousel>
        </Container>      
    </section>
  )
}

export default DichVuCarousel
