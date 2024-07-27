import React, { useEffect, useState } from 'react'
import { getTaiKhoanById, doiAvatar, updateKhachHang } from '../utils/ApiFunctions'
import { useParams } from 'react-router-dom'
import {Link} from 'react-router-dom'
const Profile = () => {
    const {tenDangNhap} = useParams()
    const [taiKhoan, setTaiKhoan] = useState({
        maKhachHang:tenDangNhap,
        ho:'',
        ten:'',
        email:'',
        sdt:'',
        cmnd:'',
        diaChi:''
    })
    const[imageSave,setImageSave]=useState("")
    const[imagePreview, setImagePreview] = useState("")
    const [role,setRole] = useState('')
    const[changeable, setChangeable] = useState(true) 
    const[successMessage, setSuccessMessage] = useState("")
    const[errorMessage, setErrorMessage] = useState("")
    const[successMessage2, setSuccessMessage2] = useState("")
    const[errorMessage2, setErrorMessage2] = useState("")
    const fetchTaiKhoanById= async()=>{
        try{
            const result = await getTaiKhoanById(tenDangNhap);
            setRole(result.quyen.tenQuyen)
            if(result.banQuanLy!==null){
                setTaiKhoan(result.banQuanLy)
                setChangeable(true)
            }
            if(result.khachHang!==null){
                setTaiKhoan(result.khachHang)
                setChangeable(false)
            }
            const hinhAnhList = result.hinhAnhList
            if(Array.isArray(hinhAnhList)&&hinhAnhList.length>0){
                const base64Str = hinhAnhList[0]
                setImagePreview(`data:image/png;base64,${base64Str}`)
            }
        }
        catch(error){
            setErrorMessage(error.message)
        }
        setTimeout(()=>{
            setErrorMessage('')
        },3000)
    }
    useEffect(()=>{
        fetchTaiKhoanById()
    },[tenDangNhap])

    const changeImage = async()=>{
        if(imageSave!==''){
            try{
                const success = await doiAvatar(imageSave,tenDangNhap)
                setImageSave('')
                setSuccessMessage2(success)
            }
            catch(error){
                setErrorMessage2(error.message)
            }
            setTimeout(()=>{
                setErrorMessage2('')
                setSuccessMessage2('')
            },3000)
        }
    }

    const handleInputChange = (e)=>{
        const name = e.target.name
        let value = e.target.value
        setTaiKhoan({...taiKhoan, [name]:value})
    }

    const handleImageChange = (e) =>{
        const selectedImage = e.target.files[0]
        setImageSave(selectedImage)
        setImagePreview(URL.createObjectURL(selectedImage))
    }

    const handleSubmit = async(e) =>{
        e.preventDefault()
        try{
            const success = await updateKhachHang(taiKhoan)
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
                {errorMessage2&&<p className='alert alert-danger'>{errorMessage2}</p>}
                {successMessage2&&<p className='alert alert-success'>{successMessage2}</p>}
                <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <button type='button' className='btn btn-hotel mb-3'
                        style={{marginRight:'10px'}} onClick={changeImage}>
                        Lưu ảnh mới
                    </button>
                    <input
                    className='form-control'
                    type='file'
                    id='image'
                    name='image'
                    onChange={handleImageChange}/>
                    {imagePreview&&(
                        <img src ={imagePreview}
                        alt='Preview hình ảnh căn hộ'
                        style={{maxWidth:"400px", maxHeight:"400px"}}
                        className='mb-3 mt-3'/>
                    )}
                </div>
                <div className='row mb-3'>
                        <label htmlFor='tenDangNhap' className='col-sm-3 col-form-label'>
                            Tên đăng nhập
                        </label>
                        <div>
                            <input
                            readOnly
                            id='tenDangNhap'
                            name='tenDangNhap'
                            type='text'
                            maxLength='50'
                            className='form-control'
                            value={tenDangNhap}/>
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
                            readOnly
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
                            readOnly
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
                    {role==="khachhang"&&(
                        <button type='submit' className='btn btn-outline-warning mx-2 mb-3'
                        style={{marginRight:'10px'}}>
                        Lưu
                        </button>
                    )}    
                    <Link className='btn btn-outline-primary mr-2 mb-3' to={`/`}>
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

export default Profile
