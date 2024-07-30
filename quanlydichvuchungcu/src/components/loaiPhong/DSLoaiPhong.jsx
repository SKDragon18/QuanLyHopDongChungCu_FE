import React, { useEffect, useState } from 'react'
import {Col, Row} from 'react-bootstrap'
import {FaEdit, FaEye, FaRedo, FaTrash} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import { deleteLoaiPhong, getLoaiPhong, getLoaiPhongById } from '../utils/ApiFunctions'
import DataPaginator from '../common/DataPaginator'
import AddLoaiPhong from './AddLoaiPhong'
import SimpleDialog from '../common/SimpleDialog'

const DSLoaiPhong = () => {
    const[loaiPhongList,setLoaiPhongList]=useState([])
    const[currentPage,setCurrentPage]=useState(1)
    const[numPerPage]=useState(8)
    const[isLoading,setIsLoading] = useState(false)
    const[showFormAdd,setShowFormAdd]=useState(false)
    const[successMessage,setSuccessMessage]=useState("")
    const[errorMessage, setErrorMessage] = useState("")
    const[open,setOpen]= useState(false)
    const[id,setId]=useState('')
    const [loaiPhong, setLoaiPhong] = useState({
      idLoaiPhong:0,
      tenLoaiPhong:''
    })
    useEffect(()=>{
        fetchLoaiPhongList()
    },[])
    const fetchLoaiPhongList = async()=>{
        setIsLoading(true)
        try{
            const result = await getLoaiPhong()
            setLoaiPhongList(result)
            setIsLoading(false)
        }catch(error){
            setErrorMessage(error.message)
        }
    }

    useEffect(()=>{
      setCurrentPage(1)
    },[loaiPhongList])

    const handleDelete = async()=>{
      if(id==='')return
      try{
        const result = await deleteLoaiPhong(id)
        setSuccessMessage(result)
        fetchLoaiPhongList()
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

    const handleEdit= async(idLoaiPhong)=>{
      try{
        const result = await getLoaiPhongById(idLoaiPhong)
        setLoaiPhong(result)
        setShowFormAdd(true)
      }
      catch(error){
        setErrorMessage(error.message)
      }
      setTimeout(()=>{
        setSuccessMessage("")
        setErrorMessage("")
      },1000)
    }

    const handlePagninationClick=(pageNumber)=>{
      setCurrentPage(pageNumber)
    }
    const calculateTotalPages = (numPerPage, list)=>{
        const totalLoaiPhong = list.length
        return Math.ceil(totalLoaiPhong/numPerPage)
    }
    const indexOfLastLoaiPhong = currentPage * numPerPage
    const indexOfFirstLoaiPhong = indexOfLastLoaiPhong - numPerPage
    const currentLoaiPhongList = loaiPhongList.slice(indexOfFirstLoaiPhong,indexOfLastLoaiPhong)
    const toggleAdd = ()=>{
      setShowFormAdd(!showFormAdd)
    }
    return (
    <>
      {isLoading?(
        <p>Loading danh sách loại phòng</p>
      ):(
        <>
        
        <section className='mt-5 mb-5 container'>
            <div>
              <SimpleDialog open={open} setOpen={setOpen} handle={handleDelete} message={'xóa loại phòng này'}/>
            </div>
            <div className='d-flex justify-content-center mb-3 mt-5'>
                <h2>Danh sách loại phòng</h2>
            </div>
            {
              showFormAdd &&(
                <div className='form-container mt-3 mb-3'>
                  <AddLoaiPhong fetchLoaiPhongList={fetchLoaiPhongList}
                  loaiPhong={loaiPhong} setLoaiPhong={setLoaiPhong}/>
                </div>
              )
            }
            <Row>
              <Col md={6} className='mb-3 mb-md-0'>
                Tra cứu
              </Col> 
              <Col md={6} className='d-flex justify-content-end'>
                <button className='btn btn-hotel mb-3' onClick={toggleAdd}>
                  {showFormAdd?'Ẩn form thêm loại phòng':'Hiển thị form thêm loại phòng'}
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
                {(currentLoaiPhongList.length===0)?
                (
                  <tr>
                    <td colSpan="10" className='text-center'>Danh sách rỗng</td>
                  </tr>
                ):(currentLoaiPhongList.map((loaiPhong)=>(
                  <tr key={loaiPhong.idLoaiPhong} className='text-center'>
                    <td>{loaiPhong.idLoaiPhong}</td>
                    <td>{loaiPhong.tenLoaiPhong.toUpperCase()}</td>
                    <td> 
                      <button
                      className='btn btn-warning btn-sm'
                      onClick={()=>handleEdit(loaiPhong.idLoaiPhong)}>
                        <FaEdit/>
                      </button>
                      <button
                      className='btn btn-danger btn-sm'
                      onClick={()=>handleClickOpen(loaiPhong.idLoaiPhong)}>
                        <FaTrash/>
                      </button>
                    </td>
                  </tr>
                )))}
              </tbody>
            </table>
            <DataPaginator
            currentPage={currentPage}
            totalPages={calculateTotalPages(numPerPage, loaiPhongList)}
            onPageChange={handlePagninationClick}/>
        </section>
        </>
      )
      }
    </>
  )
}

export default DSLoaiPhong
