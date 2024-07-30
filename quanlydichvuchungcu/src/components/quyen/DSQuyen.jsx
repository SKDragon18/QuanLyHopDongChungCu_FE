import React, { useEffect, useState } from 'react'
import {Col, Row} from 'react-bootstrap'
import {FaEdit, FaEye, FaRedo, FaTrash} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import { deleteQuyen, getQuyen, getQuyenById } from '../utils/ApiFunctions'
import DataPaginator from '../common/DataPaginator'
import AddQuyen from './AddQuyen'
import SimpleDialog from '../common/SimpleDialog'

const DSQuyen = () => {
    const[quyenList,setQuyenList]=useState([])
    const[currentPage,setCurrentPage]=useState(1)
    const[numPerPage]=useState(8)
    const[isLoading,setIsLoading] = useState(false)
    const[showFormAdd,setShowFormAdd]=useState(false)
    const[successMessage,setSuccessMessage]=useState("")
    const[errorMessage, setErrorMessage] = useState("")
    const[open,setOpen]= useState(false)
    const[id,setId]=useState('')
    const [quyen, setQuyen] = useState({
      idQuyen:0,
      tenQuyen:''
    })
    useEffect(()=>{
        fetchQuyenList()
    },[])
    const fetchQuyenList = async()=>{
        setIsLoading(true)
        try{
            const result = await getQuyen()
            setQuyenList(result)
            setIsLoading(false)
        }catch(error){
            setErrorMessage(error.message)
        }
    }

    useEffect(()=>{
      setCurrentPage(1)
    },[quyenList])

    const handleDelete = async()=>{
      if(id==='')return
      try{
        const result = await deleteQuyen(id)
        setSuccessMessage(result)
        fetchQuyenList()
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

    const handleEdit= async(id)=>{
      try{
        const result = await getQuyenById(id)
        setQuyen(result)
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
        const totalQuyen = list.length
        return Math.ceil(totalQuyen/numPerPage)
    }
    const indexOfLastQuyen = currentPage * numPerPage
    const indexOfFirstQuyen = indexOfLastQuyen - numPerPage
    const currentQuyenList = quyenList.slice(indexOfFirstQuyen,indexOfLastQuyen)
    const toggleAdd = ()=>{
      setShowFormAdd(!showFormAdd)
    }
    return (
    <>
      {isLoading?(
        <p>Loading danh sách quyền trong hệ thống</p>
      ):(
        <>
        
        <section className='mt-5 mb-5 container'>
            <div>
              <SimpleDialog open={open} setOpen={setOpen} handle={handleDelete} message={'xóa quyền này'}/>
            </div>
            <div className='d-flex justify-content-center mb-3 mt-5'>
                <h2>Danh sách quyền</h2>
            </div>
            {
              showFormAdd &&(
                <div className='form-container mt-3 mb-3'>
                  <AddQuyen fetchQuyenList={fetchQuyenList}
                  quyen={quyen} setQuyen={setQuyen}/>
                </div>
              )
            }
            <Row>
              <Col md={6} className='mb-3 mb-md-0'>
                Tra cứu
              </Col> 
              <Col md={6} className='d-flex justify-content-end'>
                <button className='btn btn-hotel mb-3' onClick={toggleAdd}>
                  {showFormAdd?'Ẩn form thêm quyền':'Hiển thị form thêm quyền'}
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
                  <th>Tên quyền</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {(currentQuyenList.length===0)?
                (
                  <tr>
                    <td colSpan="10" className='text-center'>Danh sách rỗng</td>
                  </tr>
                ):(currentQuyenList.map((quyen)=>(
                  <tr key={quyen.idQuyen} className='text-center'>
                    <td>{quyen.idQuyen}</td>
                    <td>{quyen.tenQuyen.toUpperCase()}</td>
                    <td> 
                      <button
                      className='btn btn-warning btn-sm'
                      onClick={()=>handleEdit(quyen.idQuyen)}>
                        <FaEdit/>
                      </button>
                      <button
                      className='btn btn-danger btn-sm'
                      onClick={()=>handleClickOpen(quyen.idQuyen)}>
                        <FaTrash/>
                      </button>
                    </td>
                  </tr>
                )))}
              </tbody>
            </table>
            <DataPaginator
            currentPage={currentPage}
            totalPages={calculateTotalPages(numPerPage, quyenList)}
            onPageChange={handlePagninationClick}/>
        </section>
        </>
      )
      }
    </>
  )
}

export default DSQuyen
