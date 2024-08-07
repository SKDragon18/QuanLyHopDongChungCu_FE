import React, { useEffect, useState } from 'react'
import {Col, Row} from 'react-bootstrap'
import {FaEdit, FaTrashAlt, FaEye} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import { getCanHo, deleteCanHo, updateTrangThaiCanHo } from '../utils/ApiFunctions'
import CanHoFilter from '../common/CanHoFilter'
import DataPaginator from '../common/DataPaginator'
import AddCanHo from './AddCanHo'

import SimpleDialog from '../common/SimpleDialog'

const DSCanHo = () => {
    const[canHoList,setCanHoList]=useState([])
    const[currentPage,setCurrentPage]=useState(1)
    const[numPerPage]=useState(8)
    const[isLoading,setIsLoading] = useState(false)
    const[filteredCanHoList,setFilteredCanHoList] = useState([])
    const[showFormAdd,setShowFormAdd]=useState(false)
    const[successMessage,setSuccessMessage]=useState("")
    const[errorMessage, setErrorMessage] = useState("")
    const[open,setOpen]= useState(false)
    const[id,setId]=useState(-1)
    const formatCurrency = (value, locale = 'en-US', currency = 'USD') => {
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
      }).format(value);
    };
    useEffect(()=>{
        fetchCanHoList()
    },[])
    const fetchCanHoList = async()=>{
        setIsLoading(true)
        try{
            const result = await getCanHo()
            setCanHoList(result)
            setIsLoading(false)
        }catch(error){
            setErrorMessage(error.message)
        }
    }
    
    useEffect(()=>{
      setFilteredCanHoList(canHoList)
    },[canHoList])

    useEffect(()=>{
      setCurrentPage(1)
    },[filteredCanHoList])

    const handleDelete = async()=>{
      if(id===-1)return
      const idCanHo = id
      try{
        const result = await deleteCanHo(idCanHo)
        setSuccessMessage(result + " căn hộ có id là " + String(idCanHo))
        fetchCanHoList()
      }
      catch(error){
        setErrorMessage(error.message)
      }
      setTimeout(()=>{
        setSuccessMessage("")
        setErrorMessage("")
      },3000)
    }

    const handleClickOpen=(id)=>{
      setId(id)
      setOpen(true)
    }

    
    const handleChange = async(idCanHo)=>{
      try{
        const result = await updateTrangThaiCanHo(idCanHo)
        setSuccessMessage("Thay đổi trạng thái thành công căn hộ có id là " + String(idCanHo))
        fetchCanHoList()
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
        const totalCanHo = list.length
        return Math.ceil(totalCanHo/numPerPage)
    }
    const indexOfLastCanHo = currentPage * numPerPage
    const indexOfFirstCanHo = indexOfLastCanHo - numPerPage
    const currentCanHoList = filteredCanHoList.slice(indexOfFirstCanHo,indexOfLastCanHo)
    const toggleAdd = ()=>{
      setShowFormAdd(!showFormAdd)
    }
    return (
    <>
      {isLoading?(
        <p>Loading danh sách căn hộ chung cư</p>
      ):(
        <>
        
        <section className='mt-5 mb-5 container'>
            <div>
              <SimpleDialog open={open} setOpen={setOpen} handle={handleDelete} message={'xóa thông tin căn hộ'}/>
            </div>
            <div className='d-flex justify-content-center mb-3 mt-5'>
                <h2>Danh sách căn hộ</h2>
            </div>
            {
              showFormAdd &&(
                <div className='form-container mt-3 mb-3'>
                  <AddCanHo fetchCanHoList={fetchCanHoList}/>
                </div>
              )
            }
            <Row>
              <Col md={6} className='mb-3 mb-md-0'>
                <CanHoFilter data={canHoList} setFilteredData={setFilteredCanHoList}/>
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
                  <th>Số phòng</th>
                  <th>Lô/ Khu</th>
                  <th>Loại phòng</th>
                  <th>Thời hạn</th>
                  <th>Chu kỳ thanh toán</th>
                  <th>Giá thuê</th>
                  <th>Trạng thái</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {(currentCanHoList.length===0)?
                (
                  <tr>
                    <td colSpan="10" className='text-center'>Danh sách rỗng</td>
                  </tr>
                ):(currentCanHoList.map((canHo)=>(
                  <tr key={canHo.idCanHo} className='text-center'>
                    <td>{canHo.idCanHo}</td>
                    <td>{canHo.soPhong}</td>
                    <td>{canHo.lo}</td>
                    <td>{canHo.loaiPhong.tenLoaiPhong}</td>
                    <td>{canHo.chuKy} ngày</td>
                    <td>{canHo.chuKyDong} ngày</td>
                    <td>{formatCurrency(canHo.giaThue,'vi-VN', 'VND')}</td>
                    <td>
                      {canHo.trangThai?
                        (<button
                          className='btn btn-dark btn-sm'
                          onClick={()=>handleChange(canHo.idCanHo)}>
                            Đang khóa
                          </button>)
                        :(<button
                          className='btn btn-light btn-sm'
                          onClick={()=>handleChange(canHo.idCanHo)}>
                            Đang hoạt động
                          </button>
                        )
                      }
                    </td>
                    <td className='gap-2'>
                      
                      
                      <Link to={`/edit-canho/${canHo.idCanHo}`}>
                      <span className='btn btn-info btn-sm'>
                        <FaEye/>
                      </span>
                      <span className='btn btn-warning btn-sm'>
                        <FaEdit/>
                      </span>
                      </Link>
                      
                      <button
                      className='btn btn-danger btn-sm'
                      onClick={()=>handleClickOpen(canHo.idCanHo)}>
                        <FaTrashAlt/>
                      </button>
                    </td>
                  </tr>
                )))}
              </tbody>
            </table>
            <DataPaginator
            currentPage={currentPage}
            totalPages={calculateTotalPages(numPerPage, filteredCanHoList)}
            onPageChange={handlePagninationClick}/>
        </section>
        </>
      )
      }
    </>
  )
}

export default DSCanHo
