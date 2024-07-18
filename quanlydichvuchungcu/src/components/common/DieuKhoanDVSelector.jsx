import React, { useEffect, useState } from 'react'
import { getDieuKhoan} from '../utils/ApiFunctions'
import {FaTrashAlt} from 'react-icons/fa'
const DieuKhoanDVSelector = ({dieuKhoanDichVuList, setDieuKhoanDichVuList}) => {
    const getCode = ()=>{
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        })
        return 'New'+formattedDate
    }
    const[isLoading,setIsLoading] = useState(true)
    const[readOnlyInput,setReadOnlyInput] = useState(false)
    const[dieuKhoanList, setDieuKhoanList] = useState([{
        ma:'',
        noiDung:''
    }])
    const fetchData = async ()=>{
        setIsLoading(true)
        try{
            const result = await getDieuKhoan()
            setDieuKhoanList(result)
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
    
    const[dieuKhoanMoi,setDieuKhoanMoi] = useState({
        ma:getCode(),
        noiDung:''
    })
    
    const handleDieuKhoanMoiInputChange=(e)=>{
        setDieuKhoanMoi({...dieuKhoanMoi, [e.target.name]:e.target.value})
    }
    
    const handleAddDieuKhoanMoi = ()=>{
        if(dieuKhoanMoi.noiDung !== ""){
            setDieuKhoanDichVuList([...dieuKhoanDichVuList,dieuKhoanMoi])
            setDieuKhoanMoi({
                ma:getCode(),
                noiDung:''
            })
        }
        
    }
    const handleSubDieuKhoanMoi = (ma)=>{
        setDieuKhoanDichVuList(dieuKhoanDichVuList.filter(dieuKhoan=>dieuKhoan.ma!==ma))
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
            <span className='input-group-text' id='dieuKhoanFilter'>Điều khoản</span>
            <select
                className='form-control'
                id='dieuKhoanList'
                name='dieuKhoanList'
                onChange={(e)=>{
                    if(e.target.value===''){
                        setDieuKhoanMoi({
                            ma:getCode(),
                            noiDung:''
                        })
                        setReadOnlyInput(false)
                    }
                    else{
                        const item = dieuKhoanList.find(dieuKhoan => dieuKhoan.ma === e.target.value)
                        setDieuKhoanMoi(item)
                        setReadOnlyInput(true)
                    }
                }}>
                <option value={''}>Nhập mới</option> 
                {
                    dieuKhoanList.map((val, key)=>{
                        return(
                    <option key={key} value={val.ma}>
                        {val.ma}_{val.noiDung}
                    </option>
                    )})}
            </select>
            <div className='mt-3 input-group'>
                <input
                    readOnly
                    className='form-control'
                    style={{flex:'3'}}
                    type='text'
                    placeholder='Nhập mã'
                    name='ma'
                    value={dieuKhoanMoi.ma}
                    onChange={handleDieuKhoanMoiInputChange}
                />
                <textarea
                readOnly={readOnlyInput}
                className='form-control'
                style={{flex:'7'}}
                type='text'
                placeholder='Nhập nội dung điều khoản'
                name='noiDung'
                rows='3'
                value={dieuKhoanMoi.noiDung}
                onChange={handleDieuKhoanMoiInputChange}
                />
                <button className='btn btn-hotel' type='button' onClick={handleAddDieuKhoanMoi}>
                    Add
                </button>
            </div>
        </div>
        <div>
        <table className='table table-bordered table-hover'>
              <thead>
                <tr className='text-center'>
                  <th>Mã</th>
                  <th>Nội dung</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {(!Array.isArray(dieuKhoanDichVuList)||dieuKhoanDichVuList.length===0)?
                (
                  <tr>
                    <td colSpan="7" className='text-center'>Danh sách rỗng</td>
                  </tr>
                ):(dieuKhoanDichVuList.map((dieuKhoan)=>(
                  <tr key={dieuKhoan.ma} className='text-center'>
                    <td>{dieuKhoan.ma}</td>
                    <td>{dieuKhoan.noiDung}</td>
                    <td>
                        <button type='button'
                        className='btn btn-danger btn-sm'
                        onClick={()=>handleSubDieuKhoanMoi(dieuKhoan.ma)}>
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

export default DieuKhoanDVSelector
