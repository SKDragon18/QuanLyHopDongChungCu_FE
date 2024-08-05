import React, { useEffect, useState } from 'react'
import { getAllHopDongDichVuKhachHang, huyHopDongDichVu} from '../utils/ApiFunctions'
import DataPaginator from '../common/DataPaginator'
import {FaEdit, FaTrashAlt, FaEye} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import {formatCurrency, formatTime} from '../utils/FormatValue'
import { sequenceDuyetDichVu } from '../utils/ConvertYeuCau'
import SimpleDialog from '../common/SimpleDialog'
const DSHopDongDichVu = () => {
    const[hopDongDichVuList,setHopDongDichVuList]=useState([])
    const[maKhachHang]=useState(localStorage.getItem("tenDangNhap"))
    const[currentPage,setCurrentPage]=useState(1)
    const[numPerPage]=useState(8)
    const[isLoading,setIsLoading] = useState(false)
    const[successMessage,setSuccessMessage]=useState("")
    const[errorMessage, setErrorMessage] = useState("")

    const[id,setId]=useState(-1)
    const[open,setOpen]= useState(false)
    useEffect(()=>{
        fetchHopDongDichVuList()
    },[])
    const fetchHopDongDichVuList = async()=>{
        setIsLoading(true)
        try{
            const result = await getAllHopDongDichVuKhachHang(maKhachHang)
            setHopDongDichVuList(result)
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
        const result = await huyHopDongDichVu(id)
        setSuccessMessage(result)
        fetchHopDongDichVuList()
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

    const handleClickOpen = (idYeuCauDichVu)=>{
      setId(idYeuCauDichVu)
      setOpen(true)
    }

    useEffect(()=>{
      setCurrentPage(1)
    },[hopDongDichVuList])


    const handlePagninationClick=(pageNumber)=>{
      setCurrentPage(pageNumber)
    }
    const calculateTotalPages = (numPerPage, list)=>{
        const totalHopDongDichVu = list.length
        return Math.ceil(totalHopDongDichVu/numPerPage)
    }
    const indexOfLastHopDongDichVu = currentPage * numPerPage
    const indexOfFirstHopDongDichVu = indexOfLastHopDongDichVu - numPerPage
    const currentHopDongDichVuList = hopDongDichVuList.slice(indexOfFirstHopDongDichVu,indexOfLastHopDongDichVu)
    return (
    <>
      {isLoading?(
        <p>Loading danh sách hợp đồng của bạn</p>
      ):(
        <>
        
        <section className='mt-5 mb-5 container'>
            <div>
              <SimpleDialog open={open} setOpen={setOpen} handle={handleDelete} message={'đồng ý hủy hợp đồng dịch vụ số '+id}/>
      
            </div>
            <div className='d-flex justify-content-center mb-3 mt-5'>
                <h2>Hợp đồng đăng ký dịch vụ</h2>
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
                  <th>Tên dịch vụ</th>
                  <th>Tên căn hộ</th>
                  <th>Ngày bắt đầu</th>
                  <th>Thanh toán tiếp theo</th>
                  <th>Giá trị hợp đồng</th>
                  <th>Yêu cầu</th>
                  <th>Xem</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {(currentHopDongDichVuList.length===0)?
                (
                  <tr>
                    <td colSpan="10" className='text-center'>Danh sách rỗng</td>
                  </tr>
                ):(currentHopDongDichVuList.map((hopDongDichVu)=>(
                  <tr key={hopDongDichVu.idYeuCauDichVu} className='text-center'>
                    <td>{hopDongDichVu.idYeuCauDichVu}</td>
                    <td>{hopDongDichVu.dichVu.tenDichVu}</td>
                    <td>{'Số '+hopDongDichVu.hopDong.canHo.soPhong+' khu ' +hopDongDichVu.hopDong.canHo.lo}</td>
                    <td>{formatTime(hopDongDichVu.ngayYeuCau)}</td>
                    <td>{formatTime(hopDongDichVu.thoiHan)}</td>
                    <td>{formatCurrency(hopDongDichVu.giaTra,'vi-VN', 'VND')}{'/'+hopDongDichVu.chuKy + ' ngày'}</td>
                    <td>{sequenceDuyetDichVu(hopDongDichVu.yeuCau,hopDongDichVu.duyet)}</td>
                    <td>
                    {hopDongDichVu.giaHan?
                        (<Link to={`/dichvu/xem/${hopDongDichVu.idYeuCauDichVu}`} className='btn btn-danger btn-sm'>
                          Gia hạn
                        </Link>)
                        :(<Link to={`/dichvu/xem/${hopDongDichVu.idYeuCauDichVu}`} className='btn btn-success btn-sm'>
                          Xem
                        </Link>
                        )
                      }
                    </td>
                    <td>
                      {
                        hopDongDichVu.chuKy===0?(
                          <text className='text-warning'>Dịch vụ này không thể hủy</text>
                        ):(
                          !hopDongDichVu.trangThai?(
                            <button
                            className='btn btn-danger btn-sm'
                            onClick={()=>handleClickOpen(hopDongDichVu.idYeuCauDichVu)}>
                              <FaTrashAlt/>
                            </button>
                          ):(
                            <text className='text-danger'>Không hoạt động</text>
                          )
                        )
                      }
                      
                    
                    </td>
                  </tr>
                )))}
              </tbody>
            </table>
            <DataPaginator
            currentPage={currentPage}
            totalPages={calculateTotalPages(numPerPage, hopDongDichVuList)}
            onPageChange={handlePagninationClick}/>
        </section>
        </>
      )
      }
    </>
  )
}

export default DSHopDongDichVu
