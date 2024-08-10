import React, { useEffect, useState } from 'react'
import {Col, Row} from 'react-bootstrap'
const HoaDonTGFilterFilter = ({data,setFilteredData}) => {
    const [thoiGianBatDau,setThoiGianBatDau] = useState("")
    const [thoiGianKetThuc,setThoiGianKetThuc] = useState("")
    const handleInputChange = (e) =>{
      const name = e.target.name
      let value = e.target.value
      if(name==='thoiGianBatDau'){
        if(thoiGianKetThuc!==''&&value>thoiGianKetThuc){
          alert("Thời gian bắt đầu phải nhỏ hơn hoặc bằng thời gian kết thúc")
          return;
        }
        setThoiGianBatDau(value)
      }
      if(name==='thoiGianKetThuc'){
        if(thoiGianBatDau!==''&&value<thoiGianBatDau){
          alert("Thời gian bắt đầu phải nhỏ hơn hoặc bằng thời gian kết thúc")
          return;
        }
        setThoiGianKetThuc(value)
      }
      const thoiGianBatDau2 = name==='thoiGianBatDau'?value:thoiGianBatDau
      const thoiGianKetThuc2 = name==='thoiGianKetThuc'?value:thoiGianKetThuc
      if(thoiGianBatDau2!==''&&thoiGianKetThuc2!==''){
        const filteredHoaDonTGFilterList = data.filter((hoaDon)=>
          hoaDon.thoiGianTao>=thoiGianBatDau2 && hoaDon.thoiGianTao<=thoiGianKetThuc2)
        setFilteredData(filteredHoaDonTGFilterList)
        
      }
    }
    const clearFilter = () =>{
      setThoiGianBatDau('')
      setThoiGianKetThuc('')
      setFilteredData(data)
    }
  return (
    <Row>
      <Col md={4} className='mb-3 mb-md-0'>
      <div className='input-group'>
      <span className='input-group-text' id='batDau'> Bắt đầu</span>
      <input
      required
      className='form-control'
      id='thoiGianBatDau'
      name='thoiGianBatDau'
      type='datetime-local'
      value={thoiGianBatDau}
      onChange={handleInputChange}/></div></Col>
      <Col md={4} className='mb-3 mb-md-0'>
      <div className='input-group'>
      <span className='input-group-text' id='batDau'> Kết thúc</span>
      <input
      required
      className='form-control'
      id='thoiGianKetThuc'
      name='thoiGianKetThuc'
      type='datetime-local'
      value={thoiGianKetThuc}
      onChange={handleInputChange}/></div></Col>
      <Col md={2} className='mb-3 mb-md-0'><button className='btn btn-hotel' type='button' onClick={clearFilter}>Clear Filter</button></Col>
      
    </Row>
    
  )
}

export default HoaDonTGFilterFilter
