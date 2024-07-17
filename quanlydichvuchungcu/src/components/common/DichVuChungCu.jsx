import React from 'react'
import { Card, Container, Row, Col } from 'react-bootstrap'
import Header from './Header'
import { FaClock, FaUtensils, FaWifi } from 'react-icons/fa'

const DichVuChungCu = () => {
  return (
    <>
      <Container className='mb-2'>
        <Header title={"Dịch vụ của chúng tôi"}/>
        <Row>
            <h4 className='text-center'>
                Các dịch vụ ở <span className='hotel-color'>Chung cư cao cấp</span>
            </h4>
            <span className='gap-2'>
                <FaClock/> -24-Hour Front Desk
            </span>
        </Row>
        <hr/>
        <Row xs={1} md={2} lg={3} className='g-4 mt-2'>
            <Col>
                <Card>
                    <Card.Body>
                        <Card.Title className='hotel-color'>
                            <FaWifi/> Wifi
                        </Card.Title>
                        <Card.Text>Stay connected with hight-speed</Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col>
                <Card>
                    <Card.Body>
                        <Card.Title className='hotel-color'>
                            <FaUtensils/> Breakfast
                        </Card.Title>
                        <Card.Text>Star</Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
      </Container>
    </>
  )
}

export default DichVuChungCu
