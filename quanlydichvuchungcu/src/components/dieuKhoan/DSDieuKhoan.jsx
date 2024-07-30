import React, { useEffect, useState } from 'react'
import {Col, Row} from 'react-bootstrap'
import {FaEdit, FaEye, FaRedo, FaTrash} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import { deleteDieuKhoan, getDieuKhoan, getDieuKhoanByMa } from '../utils/ApiFunctions'
import DataPaginator from '../common/DataPaginator'
import AddDieuKhoan from './AddDieuKhoan'
import SimpleDialog from '../common/SimpleDialog'

const DSDieuKhoan = () => {
    const[dieuKhoanList,setDieuKhoanList]=useState([])
    const[currentPage,setCurrentPage]=useState(1)
    const[numPerPage]=useState(8)
    const[isLoading,setIsLoading] = useState(false)
    const[showFormAdd,setShowFormAdd]=useState(false)
    const[successMessage,setSuccessMessage]=useState("")
    const[errorMessage, setErrorMessage] = useState("")
    const[open,setOpen]= useState(false)
    const[id,setId]=useState('')
    const [dieuKhoan, setDieuKhoan] = useState({
      ma:'New',
      noiDung:''
    })
    useEffect(()=>{
        fetchDieuKhoanList()
    },[])
    const fetchDieuKhoanList = async()=>{
        setIsLoading(true)
        try{
            const result = await getDieuKhoan()
            setDieuKhoanList(result)
            setIsLoading(false)
        }catch(error){
            setErrorMessage(error.message)
        }
    }

    useEffect(()=>{
      setCurrentPage(1)
    },[dieuKhoanList])

    const handleDelete = async()=>{
      if(id==='')return
      try{
        const result = await deleteDieuKhoan(id)
        setSuccessMessage(result)
        fetchDieuKhoanList()
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

    const handleEdit= async(ma)=>{
      try{
        const result = await getDieuKhoanByMa(ma)
        setDieuKhoan(result)
        setShowFormAdd(true)
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
        const totalDieuKhoan = list.length
        return Math.ceil(totalDieuKhoan/numPerPage)
    }
    const indexOfLastDieuKhoan = currentPage * numPerPage
    const indexOfFirstDieuKhoan = indexOfLastDieuKhoan - numPerPage
    const currentDieuKhoanList = dieuKhoanList.slice(indexOfFirstDieuKhoan,indexOfLastDieuKhoan)
    const toggleAdd = ()=>{
      setShowFormAdd(!showFormAdd)
    }
    return (
    <>
      {isLoading?(
        <p>Loading danh sách điều khoản</p>
      ):(
        <>
        
        <section className='mt-5 mb-5 container'>
            <div>
              <SimpleDialog open={open} setOpen={setOpen} handle={handleDelete} message={'xóa điều khoản này'}/>
            </div>
            <div className='d-flex justify-content-center mb-3 mt-5'>
                <h2>Danh sách điều khoản</h2>
            </div>
            {
              showFormAdd &&(
                <div className='form-container mt-3 mb-3'>
                  <AddDieuKhoan fetchDieuKhoanList={fetchDieuKhoanList}
                  dieuKhoan={dieuKhoan} setDieuKhoan={setDieuKhoan}/>
                </div>
              )
            }
            <Row>
              <Col md={6} className='mb-3 mb-md-0'>
                Tra cứu
              </Col> 
              <Col md={6} className='d-flex justify-content-end'>
                <button className='btn btn-hotel mb-3' onClick={toggleAdd}>
                  {showFormAdd?'Ẩn form thêm điều khoản':'Hiển thị form thêm điều khoản'}
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
                  <th>Mã điều khoản</th>
                  <th>Điều khoản</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {(currentDieuKhoanList.length===0)?
                (
                  <tr>
                    <td colSpan="10" className='text-center'>Danh sách rỗng</td>
                  </tr>
                ):(currentDieuKhoanList.map((dieuKhoan)=>(
                  <tr key={dieuKhoan.ma} className='text-center'>
                    <td>{dieuKhoan.ma}</td>
                    <td>{dieuKhoan.noiDung}</td>
                    <td> 
                      <button
                      className='btn btn-warning btn-sm'
                      onClick={()=>handleEdit(dieuKhoan.ma)}>
                        <FaEdit/>
                      </button>

                      <button
                      className='btn btn-danger btn-sm'
                      onClick={()=>handleClickOpen(dieuKhoan.ma)}>
                        <FaTrash/>
                      </button>
                    </td>
                  </tr>
                )))}
              </tbody>
            </table>
            <DataPaginator
            currentPage={currentPage}
            totalPages={calculateTotalPages(numPerPage, dieuKhoanList)}
            onPageChange={handlePagninationClick}/>
        </section>
        </>
      )
      }
    </>
  )
}

export default DSDieuKhoan
