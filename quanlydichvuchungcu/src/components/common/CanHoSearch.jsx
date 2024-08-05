import React, { useEffect, useState } from 'react'

const CanHoSearch = ({data,setFilteredData}) => {
    const [filter,setFilter] = useState("")
    const filterText=(text)=>{
      const filteredCanHoList = data.filter((canHo)=>
        ('Căn hộ '+canHo.soPhong+' tầng '+ String(canHo.tang)
      +' khu ' + canHo.lo).toLowerCase()
      .includes(text.toLowerCase()))
      setFilteredData(filteredCanHoList)
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

export default CanHoSearch
