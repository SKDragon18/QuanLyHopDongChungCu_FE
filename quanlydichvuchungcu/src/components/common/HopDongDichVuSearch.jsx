import React, { useEffect, useState } from 'react'

const HopDongDichVuSearch = ({data,setFilteredData}) => {
    const [filter,setFilter] = useState("")
    const filterText=(text)=>{
      const filteredHopDongDichVuList = data.filter((hopDong)=>
        (hopDong.dichVu.tenDichVu).toLowerCase()
      .includes(text.toLowerCase()))
      setFilteredData(filteredHopDongDichVuList)
    }
    const handleInputChange = (e) =>{
        const search = e.target.value
        setFilter(search)
        filterText(search)
    }
    const clearFilter = () =>{
      setFilter("")
      setFilteredData(data)
    }
    useEffect(()=>{
        filterText(filter)
    },[data])
  return (
    <div className='input-group mb-3'>
      <span className='input-group-text' id='loaiPhongFilter'>Tìm kiếm</span>
      <input
      className='form-control'
      value={filter}
      onChange={handleInputChange}
      placeholder='🔎 search '
      />
      <button className='btn btn-hotel' type='button' onClick={clearFilter}>Clear Filter</button>
    </div>
  )
}

export default HopDongDichVuSearch
