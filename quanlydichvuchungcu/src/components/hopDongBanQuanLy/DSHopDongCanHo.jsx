import React, { useEffect, useState } from 'react'
import { getAllHopDong, huyHopDong} from '../utils/ApiFunctions'
import DataPaginator from '../common/DataPaginator'
import {Link} from 'react-router-dom'
import {FaEdit, FaTrashAlt, FaEye} from 'react-icons/fa'
const DSHopDongCanHo = () => {
    const[hopDongList,setHopDongList]=useState([])
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
        fetchHopDongList()
    },[])
    const fetchHopDongList = async()=>{
        setIsLoading(true)
        try{
            const result = await getAllHopDong()
            setHopDongList(result)
            setIsLoading(false)
        }catch(error){
            setErrorMessage(error.message)
            setIsLoading(false)
        }
    }
    const handleDelete = async(idHopDong)=>{
      try{
        const result = await huyHopDong(idHopDong)
        setSuccessMessage(result)
        fetchHopDongList()
      }
      catch(error){
        setErrorMessage(error.message)
      }
      setTimeout(()=>{
        setSuccessMessage("")
        setErrorMessage("")
      },3000)
    }

    useEffect(()=>{
      setCurrentPage(1)
    },[hopDongList])


    const handlePagninationClick=(pageNumber)=>{
      setCurrentPage(pageNumber)
    }
    const calculateTotalPages = (numPerPage, list)=>{
        const totalHopDong = list.length
        return Math.ceil(totalHopDong/numPerPage)
    }
    const indexOfLastHopDong = currentPage * numPerPage
    const indexOfFirstHopDong = indexOfLastHopDong - numPerPage
    const currentHopDongList = hopDongList.slice(indexOfFirstHopDong,indexOfLastHopDong)
    return (
    <>
      {isLoading?(
        <p>Loading danh sách hợp đồng của bạn</p>
      ):(
        <>
        
        <section className='mt-5 mb-5 container'>
            
            <div className='d-flex justify-content-center mb-3 mt-5'>
                <h2>Hợp đồng thuê căn hộ</h2>
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
                  <th>ID</th>
                  <th>Căn hộ</th>
                  <th>Ngày lập</th>
                  <th>Ngày bắt đầu</th>
                  <th>Thời hạn</th>
                  <th>Giá trị hợp đồng</th>
                  <th>Chu kỳ</th>
                  <th>Trạng thái</th>
                  <th>Hủy đăng ký</th>
                </tr>
              </thead>
              <tbody>
                {(currentHopDongList.length===0)?
                (
                  <tr>
                    <td colSpan="10" className='text-center'>Danh sách rỗng</td>
                  </tr>
                ):(currentHopDongList.map((hopDong)=>(
                  <tr key={hopDong.idHopDong} className='text-center'>
                    <td>{hopDong.idHopDong}</td>
                    <td>{'Số '+hopDong.canHo.soPhong+' khu ' +hopDong.canHo.lo}</td>
                    <td>{formatTime(hopDong.ngayLap)}</td>
                    <td>{formatTime(hopDong.ngayBatDau)}</td>
                    <td>{formatTime(hopDong.thoiHan)}</td>
                    <td>{formatCurrency(hopDong.giaTri,'vi-VN', 'VND')}</td>
                    <td>{hopDong.chuKy + ' ngày'}</td>
                    <td>
                    {hopDong.giaHan?
                        (<Link to={`/canho/bqlxem/${hopDong.idHopDong}`} className='btn btn-danger btn-sm'>
                          Chưa gia hạn
                        </Link>)
                        :(<Link to={`/canho/bqlxem/${hopDong.idHopDong}`} className='btn btn-success btn-sm'>
                          Xem
                        </Link>
                        )
                      }
                    </td>
                    <td>
                    {!hopDong.trangThai?(
                        // <button
                        // className='btn btn-danger btn-sm'
                        // onClick={()=>handleDelete(hopDong.idHopDong)}>
                        //   <FaTrashAlt/>
                        // </button>
                        <text className='text-success'>Hoạt động</text>
                      ):(
                        <text className='text-danger'>Đã hủy đăng ký</text>
                    )}
                    
                    </td>
                  </tr>
                )))}
              </tbody>
            </table>
            <DataPaginator
            currentPage={currentPage}
            totalPages={calculateTotalPages(numPerPage, hopDongList)}
            onPageChange={handlePagninationClick}/>
        </section>
        </>
      )
      }
    </>
  )
}

export default DSHopDongCanHo
