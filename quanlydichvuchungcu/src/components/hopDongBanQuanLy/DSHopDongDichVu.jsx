import React, { useEffect, useState } from 'react'
import { duyetDichVu, getAllHopDongDichVu, getAllHopDongDichVuKhachHang, huyHopDongDichVu} from '../utils/ApiFunctions'
import DataPaginator from '../common/DataPaginator'
import {FaEdit, FaTrashAlt, FaEye} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import { formatCurrency, formatTime } from '../utils/FormatValue'
import { sequenceYeuCauDichVu } from '../utils/ConvertYeuCau'
import SimpleDialog from '../common/SimpleDialog'
const DSHopDongDichVu = () => {
    const[hopDongDichVuList,setHopDongDichVuList]=useState([])
    const[currentPage,setCurrentPage]=useState(1)
    const[numPerPage]=useState(8)
    const[isLoading,setIsLoading] = useState(false)
    const[successMessage,setSuccessMessage]=useState("")
    const[errorMessage, setErrorMessage] = useState("")

    const[id,setId]=useState(-1)
    const[duyet,setDuyet]=useState(-1)
    const[open,setOpen]= useState(false)
    const[open2,setOpen2]= useState(false)

    useEffect(()=>{
        fetchHopDongDichVuList()
    },[])
    const fetchHopDongDichVuList = async()=>{
        setIsLoading(true)
        try{
            const result = await getAllHopDongDichVu()
            setHopDongDichVuList(result)
            setIsLoading(false)
        }catch(error){
            setErrorMessage(error.message)
            setIsLoading(false)
        }
    }
    
    const handleDuyet = async()=>{
      if(id===-1)return;
      if(duyet===-1)return;
      try{
        const result = await duyetDichVu(id,duyet)
        setSuccessMessage(result)
        fetchHopDongDichVuList()
        setTimeout(()=>{
          setSuccessMessage("")
        },3000)
      }
      catch(error){
        setErrorMessage(error.message)
        setTimeout(()=>{
          setErrorMessage("")
        },3000)
      }
      
    }

    const handleDongY = (idHopDongDichVu,trangThaiDuyet)=>{
      setId(idHopDongDichVu)
      setDuyet(trangThaiDuyet)
      setOpen(true)
    }

    const handleTuChoi = (idHopDongDichVu,trangThaiDuyet)=>{
      setId(idHopDongDichVu)
      setDuyet(trangThaiDuyet)
      setOpen2(true)
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
              <SimpleDialog open={open} setOpen={setOpen} handle={handleDuyet} message={'đồng ý yêu cầu của hợp đồng '+id}/>
              <SimpleDialog open={open2} setOpen={setOpen2} handle={handleDuyet} message={'từ chối yêu cầu của hợp đồng '+id}/>
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
                  <th>Thời hạn</th>
                  <th>Giá trị hợp đồng</th>
                  <th>Hoạt động</th>
                  <th>Xem</th>
                  
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
                    <td>{formatCurrency(hopDongDichVu.giaTra,'vi-VN', 'VND')}{'/'+hopDongDichVu.chuKy+'ngày'}</td>
                    <td>
                      {!hopDongDichVu.trangThai?(
                        <text className='text-success'>Hoạt động</text>
                      ):(
                        <text className='text-danger'>Không hoạt động</text>
                      )}
                    </td>
                    <td>
                    <Link to={`/dichvu/bqlxem/${hopDongDichVu.idYeuCauDichVu}`} className='btn btn-success btn-sm'>
                          Xem
                    </Link>
                    </td>
                    <td>{sequenceYeuCauDichVu(hopDongDichVu.yeuCau)}</td>
                    <td>
                      {hopDongDichVu.duyet===0?(
                        <>
                        <button
                        className='btn btn-success btn-sm'
                        style={{marginRight:'10px'}}
                        onClick={()=>handleDongY(hopDongDichVu.idYeuCauDichVu,1)}>
                          Đồng ý
                        </button>
                        <button
                        className='btn btn-danger btn-sm'
                        onClick={()=>handleTuChoi(hopDongDichVu.idYeuCauDichVu,2)}>
                          Từ chối
                        </button>
                        </>
                      ):(
                        <text className='text-success'>Đã duyệt</text>
                      )}
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
