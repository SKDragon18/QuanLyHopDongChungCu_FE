import React, { useEffect, useState } from 'react'
import {Col, Row} from 'react-bootstrap'
import {FaEdit, FaEye, FaRedo} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import { updateTrangThaiTaiKhoan, getTaiKhoanList, updateQuyenTaiKhoan, resetTaiKhoan } from '../utils/ApiFunctions'
import DataPaginator from '../common/DataPaginator'
import AddTaiKhoan from './AddTaiKhoan'
import SimpleDialog from '../common/SimpleDialog'

const DSTaiKhoan = () => {
    const [username] = useState(localStorage.getItem("tenDangNhap"))
    const[taiKhoanList,setTaiKhoanList]=useState([])
    const[currentPage,setCurrentPage]=useState(1)
    const[numPerPage]=useState(8)
    const[isLoading,setIsLoading] = useState(false)
    const[showFormAdd,setShowFormAdd]=useState(false)
    const[successMessage,setSuccessMessage]=useState("")
    const[errorMessage, setErrorMessage] = useState("")
    const[open,setOpen]= useState(false)
    const[id,setId]=useState('')
    useEffect(()=>{
        fetchTaiKhoanList()
    },[])
    const fetchTaiKhoanList = async()=>{
        setIsLoading(true)
        try{
            const result = await getTaiKhoanList()
            setTaiKhoanList(result)
            setIsLoading(false)
        }catch(error){
            setErrorMessage(error.message)
        }
    }

    useEffect(()=>{
      setCurrentPage(1)
    },[taiKhoanList])

    const handleTrangThaiChange = async(tenDangNhap)=>{
      
      if(tenDangNhap===username)return
      try{
        const result = await updateTrangThaiTaiKhoan(tenDangNhap)
        setSuccessMessage("Thay đổi trạng thái thành công " + String(tenDangNhap))
        fetchTaiKhoanList()
      }
      catch(error){
        setErrorMessage(error.message)
      }
      setTimeout(()=>{
        setSuccessMessage("")
        setErrorMessage("")
      },3000)
    }

    const handleQuyenChange = async(tenDangNhap)=>{
      if(tenDangNhap===username)return
      try{
        const result = await updateQuyenTaiKhoan(tenDangNhap)
        setSuccessMessage("Thay đổi quyền thành công " + String(tenDangNhap))
        fetchTaiKhoanList()
      }
      catch(error){
        setErrorMessage(error.message)
      }
      setTimeout(()=>{
        setSuccessMessage("")
        setErrorMessage("")
      },3000)
    }

    const handleReset = async()=>{
      if(id==='')return
      const tenDangNhap = id
      try{
        const result = await resetTaiKhoan(tenDangNhap)
        setSuccessMessage(result)
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

    const handlePagninationClick=(pageNumber)=>{
      setCurrentPage(pageNumber)
    }
    const calculateTotalPages = (numPerPage, list)=>{
        const totalTaiKhoan = list.length
        return Math.ceil(totalTaiKhoan/numPerPage)
    }
    const indexOfLastTaiKhoan = currentPage * numPerPage
    const indexOfFirstTaiKhoan = indexOfLastTaiKhoan - numPerPage
    const currentTaiKhoanList = taiKhoanList.slice(indexOfFirstTaiKhoan,indexOfLastTaiKhoan)
    const toggleAdd = ()=>{
      setShowFormAdd(!showFormAdd)
    }
    return (
    <>
      {isLoading?(
        <p>Loading danh sách tài khoản hệ thống</p>
      ):(
        <>
        
        <section className='mt-5 mb-5 container'>
            <div>
              <SimpleDialog open={open} setOpen={setOpen} handle={handleReset} message={'reset mật khẩu tài khoản này'}/>
            </div>
            <div className='d-flex justify-content-center mb-3 mt-5'>
                <h2>Danh sách tài khoản</h2>
            </div>
            {
              showFormAdd &&(
                <div className='form-container mt-3 mb-3'>
                  <AddTaiKhoan fetchTaiKhoanList={fetchTaiKhoanList}/>
                </div>
              )
            }
            <Row>
              <Col md={6} className='mb-3 mb-md-0'>
                Tra cứu
              </Col> 
              <Col md={6} className='d-flex justify-content-end'>
                <button className='btn btn-hotel mb-3' onClick={toggleAdd}>
                  {showFormAdd?'Ẩn form thêm tài khoản nhân viên':'Hiển thị form thêm tài khoản nhân viên'}
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
                  <th>Tên đăng nhập</th>
                  <th>Mật khẩu</th>
                  <th>Quyền</th>
                  <th>Trạng thái</th>
                  <th>Phân quyền</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {(currentTaiKhoanList.length===0)?
                (
                  <tr>
                    <td colSpan="10" className='text-center'>Danh sách rỗng</td>
                  </tr>
                ):(currentTaiKhoanList.map((taiKhoan)=>(
                  <tr key={taiKhoan.tenDangNhap} className='text-center'>
                    <td>{taiKhoan.tenDangNhap}</td>
                    <td>*****</td>
                    <td>{taiKhoan.quyen.tenQuyen.toUpperCase()}</td>
                    <td>
                      {taiKhoan.khoa?
                        (<button
                          className='btn btn-dark btn-sm'
                          onClick={()=>handleTrangThaiChange(taiKhoan.tenDangNhap)}>
                            Đang khóa
                          </button>)
                        :(<button
                          className='btn btn-light btn-sm'
                          onClick={()=>handleTrangThaiChange(taiKhoan.tenDangNhap)}>
                            Đang hoạt động
                          </button>
                        )
                      }
                    </td>
                    <td className='gap-2'>
                      {
                        taiKhoan.quyen.tenQuyen==="admin"&&(
                          <button
                          className='btn btn-warning btn-sm'
                          onClick={()=>handleQuyenChange(taiKhoan.tenDangNhap)}>
                            Chuyển quyền quản lý
                          </button>
                        )
                      }
                      {
                        taiKhoan.quyen.tenQuyen==="quanly"&&(
                          <button
                          className='btn btn-warning btn-sm'
                          onClick={()=>handleQuyenChange(taiKhoan.tenDangNhap)}>
                            Chuyển quyền admin
                          </button>
                        )
                      }
                      {
                        taiKhoan.quyen.tenQuyen!=="quanly"&&taiKhoan.quyen.tenQuyen!=="admin"
                        &&(<button
                          className='btn btn-warning btn-sm'>
                            Mặc định
                          </button>
                          )
                      }
                    </td>
                    <td> 
                    <Link to={`/edit-taikhoan/${taiKhoan.quyen.tenQuyen}/${taiKhoan.tenDangNhap}`}>
                      <span className='btn btn-info btn-sm'>
                        <FaEye/>
                      </span>
                      <span className='btn btn-warning btn-sm'>
                        <FaEdit/>
                      </span>
                      </Link>
                      <button
                      className='btn btn-primary btn-sm'
                      onClick={()=>handleClickOpen(taiKhoan.tenDangNhap)}>
                        <FaRedo/>
                      </button>
                      </td>
                  </tr>
                )))}
              </tbody>
            </table>
            <DataPaginator
            currentPage={currentPage}
            totalPages={calculateTotalPages(numPerPage, taiKhoanList)}
            onPageChange={handlePagninationClick}/>
        </section>
        </>
      )
      }
    </>
  )
}

export default DSTaiKhoan
