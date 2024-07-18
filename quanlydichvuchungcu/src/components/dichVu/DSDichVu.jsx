import React, { useEffect, useState } from 'react'
import {Col, Row} from 'react-bootstrap'
import {FaEdit, FaTrashAlt, FaEye} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import { getDichVu, deleteDichVu, updateTrangThaiDichVu } from '../utils/ApiFunctions'
import DataPaginator from '../common/DataPaginator'
import AddDichVu from './AddDichVu'

const DSDichVu = () => {
    const[dichVuList,setDichVuList]=useState([])
    const[currentPage,setCurrentPage]=useState(1)
    const[numPerPage]=useState(8)
    const[isLoading,setIsLoading] = useState(false)
    // const[filteredDichVuList,setFilteredDichVuList] = useState([])
    const[showFormAdd,setShowFormAdd]=useState(false)
    const[successMessage,setSuccessMessage]=useState("")
    const[errorMessage, setErrorMessage] = useState("")
    const formatCurrency = (value, locale = 'en-US', currency = 'USD') => {
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
      }).format(value);
    };
    useEffect(()=>{
        fetchDichVuList()
    },[])
    const fetchDichVuList = async()=>{
        setIsLoading(true)
        try{
            const result = await getDichVu()
            setDichVuList(result)
            setIsLoading(false)
        }catch(error){
            setErrorMessage(error.message)
        }
    }

    useEffect(()=>{
      setCurrentPage(1)
    },[dichVuList])

    const handleDelete = async(idDichVu)=>{
      try{
        const result = await deleteDichVu(idDichVu)
        if(result.data==="Xóa thành công"){
          setSuccessMessage(result.data + " dịch vụ có id là " + String(idDichVu))
          fetchDichVuList()
        }
        else{
          setErrorMessage(result.errorMessage)
        }
      }
      catch(error){
        setErrorMessage(error.message)
      }
      setTimeout(()=>{
        setSuccessMessage("")
        setErrorMessage("")
      },3000)
    }

    const handleChange = async(idDichVu)=>{
      try{
        const result = await updateTrangThaiDichVu(idDichVu)
        if(result.status===200){
          setSuccessMessage("Thay đổi trạng thái thành công dịch vụ có id là " + String(idDichVu))
          fetchDichVuList()
        }
        else{
          setErrorMessage(result.errorMessage)
        }
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
        const totalDichVu = list.length
        return Math.ceil(totalDichVu/numPerPage)
    }
    const indexOfLastDichVu = currentPage * numPerPage
    const indexOfFirstDichVu = indexOfLastDichVu - numPerPage
    const currentDichVuList = dichVuList.slice(indexOfFirstDichVu,indexOfLastDichVu)
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
                <h2>Danh sách dịch vụ</h2>
            </div>
            {
              showFormAdd &&(
                <div className='form-container mt-3 mb-3'>
                  <AddDichVu fetchDichVuList={fetchDichVuList}/>
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
                  <th>Tên dịch vụ</th>
                  <th>Chu kỳ</th>
                  <th>Giá hiện tại</th>
                  <th>Trạng thái</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {(currentDichVuList.length===0)?
                (
                  <tr>
                    <td colSpan="7" className='text-center'>Danh sách rỗng</td>
                  </tr>
                ):(currentDichVuList.map((dichVu)=>(
                  <tr key={dichVu.idDichVu} className='text-center'>
                    <td>{dichVu.idDichVu}</td>
                    <td>{dichVu.tenDichVu}</td>
                    <td>{dichVu.chuKy} ngày</td>
                    <td>{formatCurrency(dichVu.giaHienTai,'vi-VN', 'VND')}</td>
                    <td>
                      {dichVu.trangThai?
                        (<button
                          className='btn btn-dark btn-sm'
                          onClick={()=>handleChange(dichVu.idDichVu)}>
                            Đang khóa
                          </button>)
                        :(<button
                          className='btn btn-light btn-sm'
                          onClick={()=>handleChange(dichVu.idDichVu)}>
                            Đang hoạt động
                          </button>
                        )
                      }
                    </td>
                    <td className='gap-2'>
                      
                      
                      <Link to={`/edit-dichvu/${dichVu.idDichVu}`}>
                      <span className='btn btn-info btn-sm'>
                        <FaEye/>
                      </span>
                      <span className='btn btn-warning btn-sm'>
                        <FaEdit/>
                      </span>
                      </Link>
                      
                      <button
                      className='btn btn-danger btn-sm'
                      onClick={()=>handleDelete(dichVu.idDichVu)}>
                        <FaTrashAlt/>
                      </button>
                    </td>
                  </tr>
                )))}
              </tbody>
            </table>
            <DataPaginator
            currentPage={currentPage}
            totalPages={calculateTotalPages(numPerPage, dichVuList)}
            onPageChange={handlePagninationClick}/>
        </section>
        </>
      )
      }
    </>
  )
}

export default DSDichVu
