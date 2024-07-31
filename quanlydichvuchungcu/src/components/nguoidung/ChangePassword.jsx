import React, { useState } from 'react'
import { changePassword, getCode, recoverPassword} from '../utils/ApiFunctions'
import { useNavigate } from 'react-router-dom'

const ChangePassword = () => {
    const [tenDangNhap] = useState(localStorage.getItem('tenDangNhap')) 
    const [user, setUser] = useState({
        tenDangNhap:tenDangNhap,
        maXacThuc:'',
        matKhauCu:'',
        matKhauMoi:'',
        matKhauNhapLai:''

    })
    const [errorMessage,setErrorMessage] = useState('')
    const [successMessage,setSuccessMessage] = useState('')
    const handleInputChange=(e)=>{
        const name = e.target.name
        let value = e.target.value
        setUser({...user, [name]:value})
    }
    const handleChangePassword= async(e)=>{
        e.preventDefault()
        if(user.matKhauNhapLai!=user.matKhauMoi){
            setErrorMessage("Nhập lại không khớp")
            setTimeout(()=>{
                setErrorMessage("")
            },2000)
            return
        }
        e.preventDefault()
        try{
            const result = await changePassword(user)
            setSuccessMessage(result)
            setTimeout(()=>{
                setSuccessMessage("")
            },3000)
        }
        catch(error){
            setErrorMessage(`ChangePassword error: ${error.message}`)
        }
        setTimeout(()=>{
            setErrorMessage("")
        },3000)
    }
  return (
    <section className='container col-6 mt-5 mb-5'>
       
        <h2>Đổi mật khẩu</h2>
        {errorMessage&&<p className='alert alert-danger'>{errorMessage}</p>}
        {successMessage&&<p className='alert alert-success'>{successMessage}</p>}
        <form onSubmit={handleChangePassword}>
            <div className='row mb-3'>
                <label htmlFor='tenDangNhap' className='col-form-label'>
                    Tên đăng nhập của bạn
                </label>
                <div>
                    <input
                    readOnly
                    id='tenDangNhap'
                    name='tenDangNhap'
                    type='text'
                    maxLength='50'
                    className='form-control'
                    value={user.tenDangNhap}/>
                </div>
            </div>
            <div className='row mb-3'>
                <label htmlFor='matKhauCu' className='col-sm-2 col-form-label'>
                    Mật khẩu cũ
                </label>
                <div>
                    <input
                    required
                    id='matKhauCu'
                    name='matKhauCu'
                    type='password'
                    maxLength='50'
                    className='form-control'
                    value={user.matKhauCu}
                    onChange={handleInputChange}/>
                </div>
            </div>
            <div className='row mb-3'>
                <label htmlFor='matKhauMoi' className='col-sm-2 col-form-label'>
                    Mật khẩu mới
                </label>
                <div>
                    <input
                    required
                    id='matKhauMoi'
                    name='matKhauMoi'
                    type='password'
                    maxLength='50'
                    className='form-control'
                    value={user.matKhauMoi}
                    onChange={handleInputChange}/>
                </div>
            </div>
            <div className='row mb-3'>
                <label htmlFor='matKhauNhapLai' className='col-sm-2 col-form-label'>
                    Nhập lại mật khẩu
                </label>
                <div>
                    <input
                    required
                    id='matKhauNhapLai'
                    name='matKhauNhapLai'
                    type='password'
                    maxLength='50'
                    className='form-control'
                    value={user.matKhauNhapLai}
                    onChange={handleInputChange}/>
                </div>
            </div>
            <div className='mb-3'>
                <button type='submit' className='btn btn-hotel'
                style={{marginRight:'10px'}}>
                Đổi mật khẩu
                </button>
            </div>
            
        </form>
    </section>
  )
}

export default ChangePassword
