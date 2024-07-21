import React, { useEffect, useState } from 'react'
import { getDichVuChoDangKy } from '../utils/ApiFunctions'
import DichVuCard from './DichVuCard'
import { Container, Row, Col } from 'react-bootstrap'
import DataPaginator from '../common/DataPaginator'
const DichVu = () => {
    const[data,setData] = useState([])
    const[error,setError] = useState(null)
    const[isLoading,setIsLoading] = useState(false)
    const[currentPage,setCurrentPage] = useState(1)
    const[numPerPage] = useState(6)
    const[filteredData,setFilteredData] = useState([{
        idDichVu:0,
        tenDichVu:'',
        ghiChu:'',
        chuKy:0,
        giaHienTai:0,
        giaKhuyenMai:0
    }])
    useEffect(()=>{
        setIsLoading(true)
        getDichVuChoDangKy().then((dataCall)=>{
            const data2 =dataCall.map(item=>({
                ...item,
                giaHienTai:(item.giaKhuyenMai!==null?item.giaKhuyenMai:item.giaHienTai)
            }))
            console.log(data2)
            setData(data2)
            setFilteredData(data2)
            setIsLoading(false)
        }).catch((error)=>{
            setError(error.message)
            setIsLoading(false)
        })
    },[])
    if(isLoading){
        return <div>Loading...</div>
    }
    if(error){
        return <div className='text-danger'>Error: {error}</div>
    }
    const handlePageChange = (pageNumber)=>{
        setCurrentPage(pageNumber)
    }
    const totalPages = Math.ceil(filteredData.length/numPerPage)
    const renderDichVuList = ()=>{
        const startIndex = (currentPage-1)*numPerPage
        const endIndex = startIndex + numPerPage
        return filteredData.slice(startIndex,endIndex)
        .map((dichVu)=><DichVuCard key={dichVu.idDichVu} dichVu={dichVu}/>)
    }
    return (
    <Container>
      <Row>
        <Col md={6} className='mb-3 mb-md-0'>
            
        </Col>
        <Col md={6} className='d-flex align-items-center justify-content-end'>
            <DataPaginator currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}/>
        </Col>
      </Row>
      <Row>
        {renderDichVuList()}
      </Row>
      <Row>
        <Col md={6} className='d-flex align-items-center justify-content-end'>
            <DataPaginator currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}/>
        </Col>
      </Row>
    </Container>
  )
}

export default DichVu
