import React, { useEffect, useState } from 'react'
import {Col, Row} from 'react-bootstrap'
import {FaEdit, FaTrashAlt, FaEye} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import { getHoaDon, thanhToan} from '../utils/ApiFunctions'
import DataPaginator from '../common/DataPaginator'
import {formatCurrency, formatTime} from '../utils/FormatValue'
import SimpleDialog from '../common/SimpleDialog'
const DSHoaDon = () => {
    const[hoaDonList,setHoaDonList]=useState([])
    const[maKhachHang]=useState(localStorage.getItem("tenDangNhap"))
    const[currentPage,setCurrentPage]=useState(1)
    const[numPerPage]=useState(8)
    const[isLoading,setIsLoading] = useState(false)
    const[successMessage,setSuccessMessage]=useState("")
    const[errorMessage, setErrorMessage] = useState("")

    const[id,setId]=useState(-1)
    const[open,setOpen]= useState(false)

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

    const handlePay = async()=>{
      if(id===-1){
        return;
      }
      try{
        const success = await thanhToan(id)
        window.location.href=success.url
      }
      catch(error){
        setErrorMessage(error.message)
      }
      setTimeout(()=>{
        setErrorMessage("")
      },3000)
    }

    const handleClickOpen = (idHoaDon)=>{
      setId(idHoaDon)
      setOpen(true)
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
            <div>
              <SimpleDialog open={open} setOpen={setOpen} handle={handlePay} message={'đồng ý thanh toán hóa đơn số '+id}/>
            </div>
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
                  <th>Thời gian tạo</th>
                  <th>Thời gian đóng</th>
                  <th>Tổng số tiền</th>
                  <th>Loại đóng</th>
                  <th>Thanh toán</th>
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
                    <td>{formatTime(hoaDon.thoiGianTao)}</td>
                    <td>{formatTime(hoaDon.thoiGianDong)}</td>
                    <td>{formatCurrency(hoaDon.tongHoaDon,'vi-VN', 'VND')}</td>
                    <td>{(hoaDon.hopDong===null)?('Dịch vụ'):('Căn hộ')}</td>
                    <td>
                    {hoaDon.trangThai?(
                      <>Đã thanh toán</>
                    ):(<button
                      className='btn btn-primary btn-sm'
                      onClick={()=>handleClickOpen(hoaDon.soHoaDon)}>
                        Thanh toán
                      </button>
                    )}
                    </td>
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
