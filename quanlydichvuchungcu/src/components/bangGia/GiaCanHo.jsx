import React, { useEffect, useState } from 'react'
import { getCanHo, getDieuKhoan} from '../utils/ApiFunctions'
import {FaTrashAlt} from 'react-icons/fa'
const GiaCanHo = ({canHoUpdateList, setCanHoUpdateList}) => {
    const[isLoading,setIsLoading] = useState(true)
    const[canHoList, setCanHoList] = useState([{
        idCanHo:0,
        soPhong:'',
        tang:0,
        lo:'',
        giaThue:0
    }])
    const[canHoMoi,setCanHoMoi] = useState({
        idCanHo:0,
        soPhong:'',
        tang:0,
        lo:'',
        giaThue:0
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
            const result = await getCanHo()
            setCanHoList(result)
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
        setCanHoUpdateList(prevList=>
            prevList.map(canHo =>
                canHo.idCanHo ===id ? {...canHo, giaKhuyenMai:newValue}:canHo
            )
        )
    }

    const handleAddCanHoMoi = ()=>{
        if(canHoMoi.idCanHo !== 0){
            const canHoMoi2={
                idCanHo:canHoMoi.idCanHo,
                soPhong:canHoMoi.soPhong,
                tang:canHoMoi.tang,
                lo:canHoMoi.lo,
                giaGoc:canHoMoi.giaThue,
                giaKhuyenMai:canHoMoi.giaThue
            }
            setCanHoUpdateList([...canHoUpdateList,canHoMoi2])
            setCanHoMoi({
                idCanHo:0,
                soPhong:'',
                tang:0,
                lo:'',
                giaThue:0
            })
        }
        
    }
    const handleSubCanHoMoi = (idCanHo)=>{
        setCanHoUpdateList(canHoUpdateList.filter(canHo=>canHo.idCanHo!==idCanHo))
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
            <span className='input-group-text' id='canHoFilter'>Căn hộ</span>
            <select
                className='form-control'
                id='canHoList'
                name='canHoList'
                onChange={(e)=>{
                    const selectedValue = e.target.value
                    const item = canHoList.find((canHo) => {
                        return (String(canHo.idCanHo) === String(selectedValue))
                    })
                    if(item){
                        setCanHoMoi(item)
                    }
                    
                }}>
                {
                    canHoList.map((val, key)=>{
                        return(
                    <option key={key} value={val.idCanHo}>
                        Căn {val.soPhong} tầng {val.tang} khu {val.lo}
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
                    name='idCanHo'
                    id='idCanHo'
                    value={canHoMoi.idCanHo}
                />
                <input
                readOnly
                className='form-control'
                style={{flex:'7'}}
                placeholder='Số phòng'
                name='soPhong'
                id='soPhong'
                value={"Căn "+String(canHoMoi.soPhong)+
                    " Tầng " + String(canHoMoi.tang) + 
                    " Khu " + String(canHoMoi.lo)}
                />
                <button className='btn btn-hotel' type='button' onClick={handleAddCanHoMoi}>
                    Add
                </button>
            </div>
        </div>
        <div>
        <table className='table table-bordered table-hover'>
              <thead>
                <tr className='text-center'>
                  <th>ID</th>
                  <th>Căn hộ</th>
                  <th>Giá gốc</th>
                  <th>Giá đổi</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {!Array.isArray(canHoUpdateList)||(canHoUpdateList.length===0)?
                (
                  <tr>
                    <td colSpan="10" className='text-center'>Danh sách rỗng</td>
                  </tr>
                ):(canHoUpdateList.map((canHo)=>(
                  <tr key={canHo.idCanHo} className='text-center'>
                    <td>{canHo.idCanHo}</td>
                    <td>Căn {canHo.soPhong} tầng {canHo.tang} khu {canHo.lo}</td>
                    <td>{formatCurrency(canHo.giaGoc,'vi-VN', 'VND')}</td>
                    <td>
                        <input
                            className='form-control'
                            required
                            type='number'
                            min='0'
                            step='1000'
                            id='giaKhuyenMai'
                            name='giaKhuyenMai'
                            value={canHo.giaKhuyenMai}
                            onChange={(e)=>{
                                handleChangeGiaKhuyenMai(canHo.idCanHo,Number(e.target.value))
                            }}/>
                    </td>
                    <td>
                        <button type='button'
                        className='btn btn-danger btn-sm'
                        onClick={()=>handleSubCanHoMoi(canHo.idCanHo)}>
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

export default GiaCanHo
