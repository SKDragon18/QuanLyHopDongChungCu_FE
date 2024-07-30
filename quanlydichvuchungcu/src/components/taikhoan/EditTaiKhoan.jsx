import React, { useEffect, useState } from 'react'
import { getBanQuanLyById, updateBanQuanLy, doiHinhAnh, getKhachHangById, getTaiKhoanById } from '../utils/ApiFunctions'
import { useParams } from 'react-router-dom'
import {Link} from 'react-router-dom'
const EditTaiKhoan = () => {
    const {tenDangNhap} = useParams()
    const [taiKhoan, setTaiKhoan] = useState({
        ma:tenDangNhap,
        ho:'',
        ten:'',
        email:'',
        sdt:'',
        cmnd:'',
        diaChi:''
    })
    const[imagePreview, setImagePreview] = useState("")
    const [role,setRole] = useState('')
    const[changeable, setChangeable] = useState(true) 
    const[successMessage, setSuccessMessage] = useState("")
    const[errorMessage, setErrorMessage] = useState("")
    
    useEffect(()=>{
        const fetchTaiKhoanById= async()=>{
            try{
                const result = await getTaiKhoanById(tenDangNhap);
                setRole(result.quyen.tenQuyen)
                if(result.banQuanLy!==null){
                    setTaiKhoan(result.banQuanLy)
                    setChangeable(false)
                }
                if(result.khachHang!==null){
                    setTaiKhoan(result.khachHang)
                    setChangeable(true)
                }
                const hinhAnhList = result.hinhAnhList
                if(Array.isArray(hinhAnhList)&&hinhAnhList.length>0){
                    const base64Str = hinhAnhList[0]
                    setImagePreview(`data:image/png;base64,${base64Str}`)
                }
                setErrorMessage("")
            }
            catch(error){
                setErrorMessage(error.message)
            }
        }
        fetchTaiKhoanById()
        
    },[tenDangNhap])

    const handleInputChange = (e)=>{
        const name = e.target.name
        let value = e.target.value
        setTaiKhoan({...taiKhoan, [name]:value})
    }

    const handleSubmit = async(e) =>{
        e.preventDefault()
        
        try{
            const success = await updateBanQuanLy(taiKhoan)
            console.log(taiKhoan)
            setSuccessMessage("Cập nhật thông tin thành công")
            setTaiKhoan(success)
        }
        catch(error){
            setErrorMessage(error.message)
        }
        setTimeout(()=>{
            setSuccessMessage("")
            setErrorMessage("")
        },3000)
    }

    return (
        <>
        <section className='container, mt-5 mb-5'>
            <div className='row justify-content-center'>
                <div className='col-md-8 col-lg-6'>
                <h2 className='mt-5 mb-2'>Thông tin chủ tài khoản</h2>
                
                <form onSubmit={handleSubmit}>
                    <div className='row mb-3'>
                        {imagePreview&&(
                        <img src ={imagePreview}
                        alt='Preview hình ảnh căn hộ'
                        style={{maxWidth:"400px", maxHeight:"400px"}}
                        className='mb-3 mt-3'/>)}
                    </div>
                    <div className='row mb-3'>
                        <label htmlFor='ma' className='col-sm-3 col-form-label'>
                            Tên đăng nhập
                        </label>
                        <div>
                            <input
                            readOnly
                            id='ma'
                            name='ma'
                            type='text'
                            maxLength='50'
                            className='form-control'
                            value={taiKhoan.ma}/>
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <label htmlFor='ho' className='col-sm-2 col-form-label'>
                            Họ
                        </label>
                        <div>
                            <input
                            required
                            readOnly={changeable}
                            id='ho'
                            name='ho'
                            type='text'
                            maxLength='50'
                            className='form-control'
                            value={taiKhoan.ho}
                            onChange={handleInputChange}/>
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <label htmlFor='ten' className='col-sm-2 col-form-label'>
                            Tên
                        </label>
                        <div>
                            <input
                            required
                            readOnly={changeable}
                            id='ten'
                            name='ten'
                            type='text'
                            maxLength='100'
                            className='form-control'
                            value={taiKhoan.ten}
                            onChange={handleInputChange}/>
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <label htmlFor='email' className='col-sm-4 col-form-label'>
                            Điện thoại liên lạc
                        </label>
                        <div>
                            <input
                            readOnly={changeable}
                            id='sdt'
                            name='sdt'
                            type='text'
                            maxLength='10'
                            className='form-control'
                            value={taiKhoan.sdt}
                            onChange={handleInputChange}/>
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <label htmlFor='email' className='col-sm-2 col-form-label'>
                            Email
                        </label>
                        <div>
                            <input
                            required
                            readOnly={changeable}
                            id='email'
                            name='email'
                            type='email'
                            maxLength='128'
                            className='form-control'
                            value={taiKhoan.email}
                            onChange={handleInputChange}/>
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <label htmlFor='diaChi' className='col-sm-2 col-form-label'>
                            Địa chỉ
                        </label>
                        <div>
                            <input
                            required
                            readOnly={changeable}
                            id='diaChi'
                            name='diaChi'
                            type='text'
                            maxLength='128'
                            className='form-control'
                            value={taiKhoan.diaChi}
                            onChange={handleInputChange}/>
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <label htmlFor='cmnd' className='col-sm-2 col-form-label'>
                            CMND
                        </label>
                        <div>
                            <input
                            readOnly={changeable}
                            required
                            id='cmnd'
                            name='cmnd'
                            type='text'
                            maxLength='12'
                            className='form-control'
                            value={taiKhoan.cmnd}
                            onChange={handleInputChange}/>
                        </div>
                    </div>
                    
                    <div className='mb-3'>
                    {errorMessage&&<p className='alert alert-danger'>{errorMessage}</p>}
                    {successMessage&&<p className='alert alert-success'>{successMessage}</p>}
                    {role!=="khachhang"&&(
                        <button type='submit' className='btn btn-outline-warning mx-2 mb-3'
                        style={{marginRight:'10px'}}>
                        Lưu
                        </button>
                    )}    
                    <Link className='btn btn-outline-primary mr-2 mb-3' to={`/ds-taikhoan`}>
                        <span >
                            Trở về
                        </span>
                    </Link>
                    </div>
                </form>
                </div>
            </div>
        </section>
        </>
    )
}

export default EditTaiKhoan
