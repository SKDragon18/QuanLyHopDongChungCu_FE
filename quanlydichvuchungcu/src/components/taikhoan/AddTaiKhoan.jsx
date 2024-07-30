import React, { useEffect, useState } from 'react'
import { insertTaiKhoan} from '../utils/ApiFunctions'
import QuyenSelector from '../common/QuyenSelector'

const AddTaiKhoan = ({fetchTaiKhoanList}) => {
    const [taiKhoan, setTaiKhoan] = useState({
        ho:'',
        ten:'',
        email:'',
        sdt:'',
        cmnd:'',
        diaChi:'',
        tenDangNhap:'NV_Số',
        idQuyen:0,
        matKhau:'',
        matKhauNhapLai:''

    })
    const[successMessage, setSuccessMessage] = useState("")
    const[errorMessage, setErrorMessage] = useState("")
    const handleInputChange = (e)=>{
        const name = e.target.name
        let value = e.target.value
        setTaiKhoan({...taiKhoan, [name]:value})
    }
    const handleRegister = async(e) =>{
        e.preventDefault()
        try{
            const success = await insertTaiKhoan(taiKhoan)
            setSuccessMessage(success)
        }
        catch(error){
            setErrorMessage(error.message)
        }
        setTimeout(()=>{
            setSuccessMessage("")
            setErrorMessage("")
            fetchTaiKhoanList()
        },3000)
    }
    return (
    <>
    <section className='container, mt-5 mb-5'>
        <div className='row justify-content-center'>
            <div className='col-md-8 col-lg-6'>
                <h2 className='mt-5 mb-2'>Đăng ký thông tin nhân viên</h2>
                
                <form onSubmit={handleRegister}>
                    <div className='row mb-3'>
                        <label htmlFor='ho' className='col-sm-2 col-form-label'>
                            Họ
                        </label>
                        <div>
                            <input
                            required
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
                            value={taiKhoan.tenDangNhap}/>
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <label htmlFor='matKhau' className='col-sm-2 col-form-label'>
                            Mật khẩu
                        </label>
                        <div>
                            <input
                            required
                            id='matKhau'
                            name='matKhau'
                            type='password'
                            className='form-control'
                            value={taiKhoan.matKhau}
                            onChange={handleInputChange}/>
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <label htmlFor='matKhauNhapLai' className='col-sm-4 col-form-label'>
                            Nhập lại mật khẩu
                        </label>
                        <div>
                            <input
                            required
                            id='matKhauNhapLai'
                            name='matKhauNhapLai'
                            type='password'
                            className='form-control'
                            value={taiKhoan.matKhauNhapLai}
                            onChange={handleInputChange}/>
                        </div>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='quyen' className='form-label'>Phân quyền</label>
                        <div>
                            <QuyenSelector handleInputChange={handleInputChange}/>
                        </div>
                    </div>
                    <div className='mb-3'>
                    {errorMessage&&<p className='alert alert-danger'>{errorMessage}</p>}
                    {successMessage&&<p className='alert alert-success'>{successMessage}</p>}
                        <button type='submit' className='btn btn-hotel'
                        style={{marginRight:'10px'}}>
                        Đăng ký
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </section>
    </>
  )
}

export default AddTaiKhoan
