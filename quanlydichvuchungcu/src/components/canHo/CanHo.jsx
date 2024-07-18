import React, { useEffect, useState } from 'react'
import { getCanHoChoThue } from '../utils/ApiFunctions'
import CanHoCard from './CanHoCard'
import { Container, Row, Col } from 'react-bootstrap'
import CanHoFilter from '../common/CanHoFilter'
import DataPaginator from '../common/DataPaginator'
const CanHo = () => {
    const[data,setData] = useState([])
    const[error,setError] = useState(null)
    const[isLoading,setIsLoading] = useState(false)
    const[currentPage,setCurrentPage] = useState(1)
    const[numPerPage] = useState(6)
    const[filteredData,setFilteredData] = useState([{idCanHo:'',
        hinhAnhList:[],
        soPhong:0,
        giaThue:0,
        moTa:''
    }])
    useEffect(()=>{
        setIsLoading(true)
        getCanHoChoThue().then((data)=>{
            setData(data)
            setFilteredData(data)
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
    const renderCanHoList = ()=>{
        const startIndex = (currentPage-1)*numPerPage
        const endIndex = startIndex + numPerPage
        return filteredData.slice(startIndex,endIndex)
        .map((canHo)=><CanHoCard key={canHo.idCanHo} canHo={canHo}/>)
    }
    return (
    <Container>
      <Row>
        <Col md={6} className='mb-3 mb-md-0'>
            <CanHoFilter data={data} setFilteredData={setFilteredData}/>
        </Col>
        <Col md={6} className='d-flex align-items-center justify-content-end'>
            <DataPaginator currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}/>
        </Col>
      </Row>
      <Row>
        {renderCanHoList()}
      </Row>
      <Row>
        <Col md={6} className='d-flex align-items-center justify-content-end'>
            <DataPaginator currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}/>
        </Col>
      </Row>
    </Container>
  )
}

export default CanHo
