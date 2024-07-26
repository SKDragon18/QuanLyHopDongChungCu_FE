import React, { useEffect, useState } from 'react'
import {Col, Row} from 'react-bootstrap'
import {FaEdit, FaTrashAlt, FaEye} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import { getHoaDon} from '../utils/ApiFunctions'
import DataPaginator from '../common/DataPaginator'
const DSHoaDon = () => {
    const[hoaDonList,setHoaDonList]=useState([])
    const[maKhachHang]=useState(localStorage.getItem("tenDangNhap"))
    const[currentPage,setCurrentPage]=useState(1)
    const[numPerPage]=useState(8)
    const[isLoading,setIsLoading] = useState(false)
    const[successMessage,setSuccessMessage]=useState("")
    const[errorMessage, setErrorMessage] = useState("")
    const formatCurrency = (value, locale = 'en-US', currency = 'USD') => {
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
      }).format(value);
    };
    const formatTime = (time)=>{
      const dateObject = new Date(time)
      return dateObject.toLocaleString()
    }
    useEffect(()=>{
        fetchHoaDonList()
    },[])
    const fetchHoaDonList = async()=>{
        setIsLoading(true)
        try{
            const result = await getHoaDon(maKhachHang)
            setHoaDonList(result)
            setIsLoading(false)
        }catch(error){
            setErrorMessage(error.message)
            setIsLoading(false)
        }
    }
    

    useEffect(()=>{
      setCurrentPage(1)
    },[hoaDonList])


    const handlePagninationClick=(pageNumber)=>{
      setCurrentPage(pageNumber)
    }
    const calculateTotalPages = (numPerPage, list)=>{
        const totalHoaDon = list.length
        return Math.ceil(totalHoaDon/numPerPage)
    }
    const indexOfLastHoaDon = currentPage * numPerPage
    const indexOfFirstHoaDon = indexOfLastHoaDon - numPerPage
    const currentHoaDonList = hoaDonList.slice(indexOfFirstHoaDon,indexOfLastHoaDon)
    return (
    <>
      {isLoading?(
        <p>Loading danh sách hóa đơn của bạn</p>
      ):(
        <>
        
        <section className='mt-5 mb-5 container'>
            
            <div className='d-flex justify-content-center mb-3 mt-5'>
                <h2>Danh sách hóa đơn của bạn</h2>
            </div>
            {successMessage&&(
              <div className='alert alert-success fade show'>{successMessage}</div>
            )}
            {errorMessage&&(
              <div className='alert alert-danger fade show'>{errorMessage}</div>
            )}
            <table className='table table-bordered table-hover'>
              <thead>
                <tr className='text-center'>
                  <th>Số hóa đơn</th>
                  <th>Thời gian đóng</th>
                  <th>Tổng số tiền</th>
                  <th>Loại đóng</th>
                </tr>
              </thead>
              <tbody>
                {(currentHoaDonList.length===0)?
                (
                  <tr>
                    <td colSpan="7" className='text-center'>Danh sách rỗng</td>
                  </tr>
                ):(currentHoaDonList.map((hoaDon)=>(
                  <tr key={hoaDon.idHoaDon} className='text-center'>
                    <td>{hoaDon.soHoaDon}</td>
                    <td>{formatTime(hoaDon.thoiGianDong)}</td>
                    <td>{formatCurrency(hoaDon.tongHoaDon,'vi-VN', 'VND')}</td>
                    <td>{(hoaDon.hopDong===null)?('Dịch vụ'):('Căn hộ')}</td>
                  </tr>
                )))}
              </tbody>
            </table>
            <DataPaginator
            currentPage={currentPage}
            totalPages={calculateTotalPages(numPerPage, hoaDonList)}
            onPageChange={handlePagninationClick}/>
        </section>
        </>
      )
      }
    </>
  )
}

export default DSHoaDon
