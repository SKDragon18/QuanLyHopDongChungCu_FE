import React, { useEffect, useState } from 'react'
import { duyetCanHo, getAllHopDong, huyHopDong} from '../utils/ApiFunctions'
import DataPaginator from '../common/DataPaginator'
import {Link} from 'react-router-dom'
import {formatCurrency, formatTime} from '../utils/FormatValue'
import {sequenceYeuCauCanHo} from '../utils/ConvertYeuCau'
import {FaEdit, FaTrashAlt, FaEye} from 'react-icons/fa'
import SimpleDialog from '../common/SimpleDialog'
const DSHopDongCanHo = () => {
    const[hopDongList,setHopDongList]=useState([])
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
    const handleDuyet = async()=>{
      if(id===-1)return;
      if(duyet===-1)return;
      try{
        const result = await duyetCanHo(id,duyet)
        setSuccessMessage(result)
        fetchHopDongList()
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

    const handleDongY = (idHopDong,trangThaiDuyet)=>{
      setId(idHopDong)
      setDuyet(trangThaiDuyet)
      setOpen(true)
    }

    const handleTuChoi = (idHopDong,trangThaiDuyet)=>{
      setId(idHopDong)
      setDuyet(trangThaiDuyet)
      setOpen2(true)
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
              <SimpleDialog open={open} setOpen={setOpen} handle={handleDuyet} message={'đồng ý yêu cầu của hợp đồng '+id}/>
              <SimpleDialog open={open2} setOpen={setOpen2} handle={handleDuyet} message={'từ chối yêu cầu của hợp đồng '+id}/>
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
                  <th>Ngày lập</th>
                  <th>Ngày bắt đầu</th>
                  <th>Thời hạn</th>
                  <th>Giá trị hợp đồng</th>
                  <th>Hoạt động</th>
                  <th>Xem</th>
                  <th>Yêu cầu</th>
                  <th>Duyệt</th>
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
                    <td>{formatCurrency(hopDong.giaTri,'vi-VN', 'VND')}{'/'+hopDong.chuKyDong+'ngày'}</td>
                    <td>
                    {!hopDong.trangThai?(
                        <text className='text-success'>Hoạt động</text>
                      ):(
                        <text className='text-danger'>Không hoạt động</text>
                    )}
                    </td>
                    <td>
                        <Link to={`/canho/bqlxem/${hopDong.idHopDong}`} className='btn btn-success btn-sm'>
                          Xem
                        </Link>
                    </td>
                    <td>{sequenceYeuCauCanHo(hopDong.yeuCau)}</td>
                    <td>
                      {hopDong.duyet===0?(
                        <>
                        <button
                        className='btn btn-success btn-sm'
                        style={{marginRight:'10px'}}
                        onClick={()=>handleDongY(hopDong.idHopDong,1)}>
                          Đồng ý
                        </button>
                        <button
                        className='btn btn-danger btn-sm'
                        onClick={()=>handleTuChoi(hopDong.idHopDong,2)}>
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
