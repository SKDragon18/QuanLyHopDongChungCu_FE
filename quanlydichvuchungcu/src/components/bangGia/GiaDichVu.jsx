import React, { useEffect, useState } from 'react'
import { getDichVu, getDieuKhoan} from '../utils/ApiFunctions'
import {FaTrashAlt} from 'react-icons/fa'
const GiaDichVu = ({dichVuUpdateList, setDichVuUpdateList}) => {
    const[isLoading,setIsLoading] = useState(true)
    const[dichVuList, setDichVuList] = useState([{
        idDichVu:0,
        tenDichVu:'',
        giaHienTai:0
    }])
    const[dichVuMoi,setDichVuMoi] = useState({
        idDichVu:0,
        tenDichVu:'',
        giaHienTai:0
    })
    const formatCurrency = (value, locale = 'en-US', currency = 'USD') => {
        return new Intl.NumberFormat(locale, {
          style: 'currency',
          currency: currency,
        }).format(value);
      };
    const fetchData = async ()=>{
        setIsLoading(true)
        try{
            const result = await getDichVu()
            setDichVuList(result)
            setIsLoading(false)
        }
        catch(error){
            console.log(error.message)
            setIsLoading(false)
        }
    }
    useEffect(()=>{
        fetchData()
    }, [])

    const handleChangeGiaKhuyenMai = (id, newValue)=>{
        setDichVuUpdateList(prevList=>
            prevList.map(dichVu =>
                dichVu.idDichVu ===id ? {...dichVu, giaKhuyenMai:newValue}:dichVu
            )
        )
    }

    const handleAddDichVuMoi = ()=>{
        if(dichVuMoi.idDichVu !== 0){
            const dichVuMoi2={
                idDichVu:dichVuMoi.idDichVu,
                tenDichVu:dichVuMoi.tenDichVu,
                giaGoc:dichVuMoi.giaHienTai,
                giaKhuyenMai:dichVuMoi.giaHienTai
            }
            setDichVuUpdateList([...dichVuUpdateList,dichVuMoi2])
            setDichVuMoi({
                idDichVu:0,
                tenDichVu:'',
                giaHienTai:0
            })
        }
        
    }
    const handleSubDichVuMoi = (idDichVu)=>{
        setDichVuUpdateList(dichVuUpdateList.filter(dichVu=>dichVu.idDichVu!==idDichVu))
    }
    
    if(isLoading) return (<>
        <div>
        <input
            className='form-control'
            readOnly
            value='Loading...'/>
        </div>
    </>)
    return (
        <>
        <div className='input-group mb-3'>
            <span className='input-group-text' id='dichVuFilter'>Căn hộ</span>
            <select
                className='form-control'
                id='dichVuList'
                name='dichVuList'
                onChange={(e)=>{
                    const selectedValue = e.target.value
                    const item = dichVuList.find((dichVu) => {
                        return (String(dichVu.idDichVu) === String(selectedValue))
                    })
                    if(item){
                        setDichVuMoi(item)
                    }
                    
                }}>
                {
                    dichVuList.map((val, key)=>{
                        return(
                    <option key={key} value={val.idDichVu}>
                        {val.tenDichVu}
                    </option>
                    )})}
            </select>
            <div className='mt-3 input-group'>
                <input
                    readOnly
                    className='form-control'
                    style={{flex:'3'}}
                    type='number'
                    placeholder='ID'
                    name='idDichVu'
                    id='idDichVu'
                    value={dichVuMoi.idDichVu}
                />
                <input
                readOnly
                className='form-control'
                style={{flex:'7'}}
                placeholder='Số phòng'
                name='soPhong'
                id='soPhong'
                value={dichVuMoi.tenDichVu}
                />
                <button className='btn btn-hotel' type='button' onClick={handleAddDichVuMoi}>
                    Add
                </button>
            </div>
        </div>
        <div>
        <table className='table table-bordered table-hover'>
              <thead>
                <tr className='text-center'>
                  <th>ID</th>
                  <th>Tên dịch vụ</th>
                  <th>Giá gốc</th>
                  <th>Giá đổi</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {!Array.isArray(dichVuUpdateList)||(dichVuUpdateList.length===0)?
                (
                  <tr>
                    <td colSpan="10" className='text-center'>Danh sách rỗng</td>
                  </tr>
                ):(dichVuUpdateList.map((dichVu)=>(
                  <tr key={dichVu.idDichVu} className='text-center'>
                    <td>{dichVu.idDichVu}</td>
                    <td>{dichVu.tenDichVu}</td>
                    <td>{formatCurrency(dichVu.giaGoc,'vi-VN', 'VND')}</td>
                    <td>
                        <input
                            className='form-control'
                            required
                            type='number'
                            min='0'
                            step='1000'
                            id='giaKhuyenMai'
                            name='giaKhuyenMai'
                            value={dichVu.giaKhuyenMai}
                            onChange={(e)=>{
                                handleChangeGiaKhuyenMai(dichVu.idDichVu,Number(e.target.value))
                            }}/></td>
                    <td>
                        <button type='button'
                        className='btn btn-danger btn-sm'
                        onClick={()=>handleSubDichVuMoi(dichVu.idDichVu)}>
                            <FaTrashAlt/>
                        </button>
                    </td>
                  </tr>
                )))}
              </tbody>
            </table>
        </div>
        </>
    )
}

export default GiaDichVu
