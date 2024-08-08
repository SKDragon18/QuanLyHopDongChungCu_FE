import React, { useEffect, useState } from 'react'
import {Col, Row} from 'react-bootstrap'
const HoaDonFilter = ({data,setFilteredData}) => {
    const [filter,setFilter] = useState('-1')
    const handleSelectChange = (e) =>{
        const value = e.target.value
        setFilter(value)
        if(value==='-1'){
          setFilteredData(data)
          return;
        }
        if(value==='1'){
          const filteredHoaDonList = data.filter((hoaDon)=>
          hoaDon.trangThai===true)
          setFilteredData(filteredHoaDonList)
        }
        else{
          const filteredHoaDonList = data.filter((hoaDon)=>
          hoaDon.trangThai===false)
          setFilteredData(filteredHoaDonList)
        }
        
    }
    const clearFilter = () =>{
      setFilter('-1')
      setFilteredData(data)
    }
  return (
    <Row>
    <Col md={6} className='mb-3 mb-md-0'>
      <div className='input-group'>
      <span className='input-group-text' id='hoaDonFilter'>Loại hóa đơn</span>
      <select
      className='form-select'
      value={filter}
      onChange={handleSelectChange}>
        <option key={'-1'} value={'-1'}>{'Tất cả'}</option>
        <option key={'1'} value={'1'}>
            {'Đã thanh toán'}
        </option>
        <option key={'0'} value={'0'}>
            {'Chưa thanh toán'}
        </option>
      </select>
      <button className='btn btn-hotel' type='button' onClick={clearFilter}>Clear Filter</button>
      </div>
    </Col>
    
    </Row>
  )
}

export default HoaDonFilter
