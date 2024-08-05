import React, { useEffect, useState } from 'react'
import { getAllHopDongKhachHang, huyHopDong} from '../utils/ApiFunctions'
import DataPaginator from '../common/DataPaginator'
import {Link} from 'react-router-dom'
import {FaEdit, FaTrashAlt, FaEye} from 'react-icons/fa'
import {sequenceDuyetCanHo} from '../utils/ConvertYeuCau'
import {formatCurrency, formatTime} from '../utils/FormatValue'
import SimpleDialog from '../common/SimpleDialog'
const DSHopDongCanHo = () => {
    const[hopDongList,setHopDongList]=useState([])
    const[maKhachHang]=useState(localStorage.getItem("tenDangNhap"))
    const[currentPage,setCurrentPage]=useState(1)
    const[numPerPage]=useState(8)
    const[isLoading,setIsLoading] = useState(false)
    const[successMessage,setSuccessMessage]=useState("")
    const[errorMessage, setErrorMessage] = useState("")

    const[id,setId]=useState(-1)
    const[open,setOpen]= useState(false)

    useEffect(()=>{
        fetchHopDongList()
    },[])
    const fetchHopDongList = async()=>{
        setIsLoading(true)
        try{
            const result = await getAllHopDongKhachHang(maKhachHang)
            setHopDongList(result)
            setIsLoading(false)
        }catch(error){
            setErrorMessage(error.message)
            setIsLoading(false)
        }
    }
    const handleDelete = async()=>{
      if(id===-1){
        return;
      }
      try{
        const result = await huyHopDong(id)
        setSuccessMessage(result)
        fetchHopDongList()
      }
      catch(error){
        setErrorMessage(error.message)
      }
      setTimeout(()=>{
        setId(-1)
        setSuccessMessage("")
        setErrorMessage("")
      },3000)
    }

    const handleClickOpen = (idHopDong)=>{
      setId(idHopDong)
      setOpen(true)
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
            <div>
              <SimpleDialog open={open} setOpen={setOpen} handle={handleDelete} message={'đồng ý hủy hợp đồng số '+id}/>
            </div>
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
                  <th>Ngày bắt đầu</th>
                  <th>Thanh toán tiếp theo</th>
                  <th>Ngày kết thúc</th>
                  <th>Giá trị hợp đồng</th>
                  <th>Yêu cầu</th>
                  <th>Xem</th>
                  <th>Trạng thái</th>
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
                    <td>{formatTime(hopDong.ngayBatDau)}</td>
                    <td>{formatTime(hopDong.thoiGianDong)}</td>
                    <td>{formatTime(hopDong.thoiHan)}</td>
                    <td>{formatCurrency(hopDong.giaTri,'vi-VN', 'VND')} {'/'+hopDong.chuKyDong+'ngày'}</td>
                    <td>{sequenceDuyetCanHo(hopDong.yeuCau,hopDong.duyet)}</td>
                    <td>
                    {hopDong.giaHan?
                        (<Link to={`/canho/xem/${hopDong.idHopDong}`} className='btn btn-danger btn-sm'>
                          Gia hạn
                        </Link>)
                        :(<Link to={`/canho/xem/${hopDong.idHopDong}`} className='btn btn-success btn-sm'>
                          Xem
                        </Link>
                        )
                      }
                    </td>
                    <td>
                    {!hopDong.trangThai?(
                        <button
                        className='btn btn-danger btn-sm'
                        onClick={()=>handleClickOpen(hopDong.idHopDong)}>
                          <FaTrashAlt/>
                        </button>
                      ):(
                        <text className='text-danger'>Không hoạt động</text>
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
