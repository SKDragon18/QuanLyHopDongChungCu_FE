import React, { useEffect, useState } from 'react'
import { getCanHoChoThue } from '../utils/ApiFunctions'
import { Link } from 'react-router-dom'
import {Card, Carousel, Col, Container, Row} from 'react-bootstrap'
import apartment from '../../assets/images/apartment.png'
import { formatCurrency } from '../utils/FormatValue'
const CanHoCarousel = () => {
    const [canHoList, setCanHoList] = useState([{idCanHo:'',
        hinhAnhList:[],
        soPhong:0,
        giaThue:0,
        moTa:'',
        chuKy:30,
        lo:'A'
    }])
    const [errorMessage,setErrorMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    useEffect(()=>{
        setIsLoading(true)
        getCanHoChoThue().then((data)=>{
            const data2 =data.filter((canHo)=>(canHo.trangThaiThue===0))
            .map(item=>({
                ...item,
                giaThue:(item.giaKhuyenMai!==null?item.giaKhuyenMai:item.giaThue)
            }))
            setCanHoList(data2)
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
  return (
    <section className='bg-light mb-5 mt-5 shadow'>
        <Link to={'/canho'} className='hotel-color text-center'>
            Căn hộ
        </Link>
        <Container>
            <Carousel indicators={false}>
                {[...Array(Math.ceil(canHoList.length/4))].map((_,index)=>(
                    <Carousel.Item key={index}>
                        <Row>
                            {canHoList.slice(index*4,index*4 + 4).map((canHo)=>(
                                <Col key={canHo.idCanHo} className='mb-4' xs={12} md={6} lg={3}>
                                    <Card>
                                        {(canHo.hinhAnhList!==null&&canHo.hinhAnhList.length>0)?
                                        (<Link to={`thue/${canHo.idCanHo}`}>
                                            <Card.Img
                                            variant='top'
                                            src={`data:image/png;base64, ${canHo.hinhAnhList[0]}`}
                                            alt='Hình căn hộ'
                                            className='w-100'
                                            style={{height:'200px'}}/>
                                        </Link>)
                                        :
                                        (<Link to={`/canho/thue/${canHo.idCanHo}`}>
                                            <Card.Img
                                            variant='top'
                                            src={apartment}
                                            alt='Hình căn hộ'
                                            className='w-100'
                                            style={{height:'200px'}}/>
                                        </Link>)}
                                        <Card.Body>
                                        <Card.Title className='hotel-color'>Căn hộ {canHo.soPhong} khu {canHo.lo}</Card.Title>
                                        <Card.Title className='room-price'>{formatCurrency(canHo.giaThue,'vi-VN', 'VND')}/ {canHo.chuKyDong} ngày</Card.Title>
                                        <div className='flex-shrink-0'>
                                            <Link to={`/canho/thue/${canHo.idCanHo}`} className='btn btn-hotel btn-sm'>
                                                Thuê ngay
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

export default CanHoCarousel
