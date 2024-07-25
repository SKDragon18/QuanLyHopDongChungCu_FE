import React, { useEffect, useState } from 'react'
import {Col, Row} from 'react-bootstrap'
import {FaEdit, FaTrashAlt, FaEye} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import { getBangGia, deleteBangGia, updateTrangThaiBangGia } from '../utils/ApiFunctions'
import DataPaginator from '../common/DataPaginator'
import AddBangGia from './AddBangGia'

const DSBangGia = () => {
    const[bangGiaList,setBangGiaList]=useState([])
    const[currentPage,setCurrentPage]=useState(1)
    const[numPerPage]=useState(8)
    const[isLoading,setIsLoading] = useState(false)
    const[showFormAdd,setShowFormAdd]=useState(false)
    const[successMessage,setSuccessMessage]=useState("")
    const[errorMessage, setErrorMessage] = useState("")
    const formatTime = (time)=>{
      const dateObject = new Date(time)
      return dateObject.toLocaleString()
    }
    useEffect(()=>{
        fetchBangGiaList()
    },[])
    const fetchBangGiaList = async()=>{
        setIsLoading(true)
        try{
            const result = await getBangGia()
            setBangGiaList(result)
            setIsLoading(false)
        }catch(error){
            setErrorMessage(error.message)
        }
    }

    useEffect(()=>{
      setCurrentPage(1)
    },[bangGiaList])

    const handleDelete = async(idBangGia)=>{
      try{
        const result = await deleteBangGia(idBangGia)
        setSuccessMessage(result + " bảng giá có id là " + String(idBangGia))
        fetchBangGiaList()
      }
      catch(error){
        setErrorMessage(error.message)
      }
      setTimeout(()=>{
        setSuccessMessage("")
        setErrorMessage("")
      },3000)
    }

    const handleChange = async(idBangGia)=>{
      try{
        const result = await updateTrangThaiBangGia(idBangGia)
        setSuccessMessage("Thay đổi trạng thái thành công bảng giá có id là " + String(idBangGia))
        fetchBangGiaList()
      }
      catch(error){
        setErrorMessage(error.message)
      }
      setTimeout(()=>{
        setSuccessMessage("")
        setErrorMessage("")
      },3000)
    }

    const handlePagninationClick=(pageNumber)=>{
      setCurrentPage(pageNumber)
    }
    const calculateTotalPages = (numPerPage, list)=>{
        const totalBangGia = list.length
        return Math.ceil(totalBangGia/numPerPage)
    }
    const indexOfLastBangGia = currentPage * numPerPage
    const indexOfFirstBangGia = indexOfLastBangGia - numPerPage
    const currentBangGiaList = bangGiaList.slice(indexOfFirstBangGia,indexOfLastBangGia)
    const toggleAdd = ()=>{
      setShowFormAdd(!showFormAdd)
    }
    return (
    <>
      {isLoading?(
        <p>Loading danh sách dịch vụ chung cư</p>
      ):(
        <>
        
        <section className='mt-5 mb-5 container'>
            
            <div className='d-flex justify-content-center mb-3 mt-5'>
                <h2>Danh sách bảng giá</h2>
            </div>
            {
              showFormAdd &&(
                <div className='form-container mt-3 mb-3'>
                  <AddBangGia fetchBangGiaList={fetchBangGiaList}/>
                </div>
              )
            }
            <Row>
              <Col md={6} className='mb-3 mb-md-0'>
                Tra cứu
              </Col> 
              <Col md={6} className='d-flex justify-content-end'>
                <button className='btn btn-hotel mb-3' onClick={toggleAdd}>
                  {showFormAdd?'Ẩn form thêm căn hộ':'Hiển thị form thêm căn hộ'}
                </button>
              </Col> 
            </Row>
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
                  <th>Nội dung</th>
                  <th>Thời gian bắt dầu</th>
                  <th>Thời gian kết thúc</th>
                  <th>Trạng thái</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {(currentBangGiaList.length===0)?
                (
                  <tr>
                    <td colSpan="10" className='text-center'>Danh sách rỗng</td>
                  </tr>
                ):(currentBangGiaList.map((bangGia)=>(
                  <tr key={bangGia.idBangGia} className='text-center'>
                    <td>{bangGia.idBangGia}</td>
                    <td>{bangGia.noiDung}</td>
                    <td>{formatTime(bangGia.thoiGianBatDau)}</td>
                    <td>{formatTime(bangGia.thoiGianKetThuc)}</td>
                    <td>
                      {!bangGia.apDung?
                        (<button
                          className='btn btn-dark btn-sm'
                          onClick={()=>handleChange(bangGia.idBangGia)}>
                            Đang khóa
                          </button>)
                        :(<button
                          className='btn btn-light btn-sm'
                          onClick={()=>handleChange(bangGia.idBangGia)}>
                            Đang hoạt động
                          </button>
                        )
                      }
                    </td>
                    <td className='gap-2'>
                      
                      
                      <Link to={`/edit-banggia/${bangGia.idBangGia}`}>
                      <span className='btn btn-info btn-sm'>
                        <FaEye/>
                      </span>
                      <span className='btn btn-warning btn-sm'>
                        <FaEdit/>
                      </span>
                      </Link>
                      
                      <button
                      className='btn btn-danger btn-sm'
                      onClick={()=>handleDelete(bangGia.idBangGia)}>
                        <FaTrashAlt/>
                      </button>
                    </td>
                  </tr>
                )))}
              </tbody>
            </table>
            <DataPaginator
            currentPage={currentPage}
            totalPages={calculateTotalPages(numPerPage, bangGiaList)}
            onPageChange={handlePagninationClick}/>
        </section>
        </>
      )
      }
    </>
  )
}

export default DSBangGia
