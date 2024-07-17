import React, { useEffect, useState } from 'react'

const CanHoFilter = ({data,setFilteredData}) => {
    const [filter,setFilter] = useState("")
    const handleSelectChange = (e) =>{
        const selectedLoaiPhong = e.target.value
        setFilter(selectedLoaiPhong)
        const filteredCanHoList = data.filter((canHo)=>
        canHo.loaiPhong.tenLoaiPhong.toLowerCase()
      .includes(selectedLoaiPhong.toLowerCase()))
      setFilteredData(filteredCanHoList)
    }
    const clearFilter = () =>{
      setFilter("")
      setFilteredData(data)
    }
    const tenLoaiPhongList = [...new Set(data.map((canHo)=>canHo.loaiPhong.tenLoaiPhong))]
  return (
    <div className='input-group mb-3'>
      <span className='input-group-text' id='loaiPhongFilter'>Căn hộ theo loại phòng</span>
      <select
      className='form-select'
      value={filter}
      onChange={handleSelectChange}>
        <option value={""}>select loại phòng</option>
        {tenLoaiPhongList.map((tenLoaiPhong,index)=>(
          <option key={index} value={tenLoaiPhong}>
            {tenLoaiPhong}
          </option>
        ))}
      </select>
      <button className='btn btn-hotel' type='button' onClick={clearFilter}>Clear Filter</button>
    </div>
  )
}

export default CanHoFilter
