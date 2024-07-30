import React, { useState } from 'react'
import { getCode, recoverPassword} from '../utils/ApiFunctions'
import { useNavigate } from 'react-router-dom'

const ForgotPassword = () => {
    const [user, setUser] = useState({
        tenDangNhap:'',
        maXacThuc:'',
        matKhauCu:'',
        matKhauMoi:'',
        matKhauNhapLai:''

    })
    const [code,setCode]=useState('')
    const [showPass, setShowPass] = useState(false)
    const [errorMessage,setErrorMessage] = useState('')
    const [successMessage,setSuccessMessage] = useState('')
    const handleInputChange=(e)=>{
        const name = e.target.name
        let value = e.target.value
        if(name === "maXacThuc"){
            if(code!==''&&value===code){
                setShowPass(true)
            }
        }
        setUser({...user, [name]:value})
    }
    const handleSendCode= async(e)=>{
        e.preventDefault()
        try{
            const result = await getCode(user.tenDangNhap)
            setCode(result)
            setSuccessMessage("Mã xác thực đã được gửi")
        }
        catch(error){
            setErrorMessage(`ForgotPassword error: ${error.message}`)
        }
        setTimeout(()=>{
            setSuccessMessage("")
            setErrorMessage("")
        },3000)
    }
    const handleForgotPassword= async(e)=>{
        if(user.matKhauNhapLai!=user.matKhauMoi){
            setErrorMessage("Nhập lại không khớp")
            setTimeout(()=>{
                setErrorMessage("")
            },3000)
            return
        }
        e.preventDefault()
        try{
            const result = await recoverPassword(user)
            setSuccessMessage(result)
            setTimeout(()=>{
                setSuccessMessage("")
                window.location.href='/login'
            },3000)
        }
        catch(error){
            setErrorMessage(`ForgotPassword error: ${error.message}`)
        }
        setTimeout(()=>{
            setErrorMessage("")
        },3000)
    }
  return (
    <section className='container col-6 mt-5 mb-5'>
       
        <h2>Quên mật khẩu</h2>
        {errorMessage&&<p className='alert alert-danger'>{errorMessage}</p>}
        {successMessage&&<p className='alert alert-success'>{successMessage}</p>}
        <form onSubmit={handleSendCode}>
            <div className='row mb-3'>
                <label htmlFor='tenDangNhap' className='col-form-label'>
                    Tên đăng nhập của bạn
                </label>
                <div>
                    <input
                    required
                    id='tenDangNhap'
                    name='tenDangNhap'
                    type='text'
                    maxLength='50'
                    className='form-control'
                    value={user.tenDangNhap}
                    onChange={handleInputChange}/>
                </div>
            </div>
            <div className='row mb-3'>
                <label htmlFor='maXacThuc' className='col-form-label'>
                    Mã nhận được từ email liên kết tài khoản trên
                </label>
                <div>
                    <input
                    id='maXacThuc'
                    name='maXacThuc'
                    type='text'
                    maxLength='8'
                    className='form-control'
                    value={user.maXacThuc}
                    onChange={handleInputChange}/>
                </div>
            </div>
            <div className='mb-3'>
            
                <button type='submit' className='btn btn-hotel'
                style={{marginRight:'10px'}}>
                Gửi mã xác thực
                </button>
            </div>
        </form>

        {showPass&&(
            <form>
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
                <button type='button' className='btn btn-hotel'
                style={{marginRight:'10px'}}
                onClick={handleForgotPassword}>
                Đổi mật khẩu
                </button>
            </div>
        </form>
        )}
    </section>
  )
}

export default ForgotPassword
