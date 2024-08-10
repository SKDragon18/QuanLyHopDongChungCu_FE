import React, { useState } from 'react'
import { registerUser } from '../utils/ApiFunctions'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [user, setUser] = useState({
        ho:'',
        ten:'',
        email:'',
        sdt:'',
        ngaySinh:'',
        tenDangNhap:'',
        matKhau:'',
        matKhauNhapLai:''

    })
    const [errorMessage,setErrorMessage] = useState('')
    const [successMessage,setSuccessMessage] = useState('')
    const [error,setError] = useState(false)
    const handleInputChange=(e)=>{
        const name = e.target.name
        let value = e.target.value
        const phonePattern = /^\d{10}$/
        const ngaySinhPattern = /^\d{12}$/
        if(name==='ngaySinh'){
            const now = new Date()
            const ngaySinh = new Date(value)
            if(ngaySinh>=now){
                setErrorMessage("Ngày sinh không hợp lý (phải bé hơn ngày hiện tại)")
                setError(true)
            }
            else{
                setErrorMessage("")
                setError(false)
            }
        }
        if(name==='sdt'){
            if(!phonePattern.test(value)){
                setErrorMessage("Không đúng định dạng số điện thoại 10 chữ số")
                setError(true)
            }
            else{
                setErrorMessage("")
                setError(false)
            }
        }
        if(name==='email'){
            if(!value.toLowerCase().includes("@")){
                setErrorMessage("Không đúng định dạng email")
                setError(true)
            }
            else{
                setErrorMessage("")
                setError(false)
            }
        }
        setUser({...user, [name]:value})
    }
    const handleRegister= async(e)=>{
        e.preventDefault()
        if(error){
            alert("Hãy xử lý lỗi trước khi gửi")
            return;
        }
        try{
            const result = await registerUser(user)
            setSuccessMessage(result)
            setTimeout(()=>{
                setSuccessMessage("")
                window.location.href="/login"
            },3000)
        }
        catch(error){
            setErrorMessage(`Register error: ${error.message}`)
            setTimeout(()=>{
                setErrorMessage("")
            },3000)
        }
        
    }
  return (
    <section className='container col-6 mt-5 mb-5'>
       
        <h2>Đăng ký</h2>
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
                    value={user.ho}
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
                    value={user.ten}
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
                    value={user.sdt}
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
                    value={user.email}
                    onChange={handleInputChange}/>
                </div>
            </div>
            <div className='row mb-3'>
                <label htmlFor='ngaySinh' className='col-sm-2 col-form-label'>
                    Ngày sinh
                </label>
                <div>
                    <input
                    required
                    id='ngaySinh'
                    name='ngaySinh'
                    type='date'
                    className='form-control'
                    value={user.ngaySinh}
                    onChange={handleInputChange}/>
                </div>
            </div>
            <div className='row mb-3'>
                <label htmlFor='tenDangNhap' className='col-sm-3 col-form-label'>
                    Tên đăng nhập
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
                    value={user.matKhau}
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
                    value={user.matKhauNhapLai}
                    onChange={handleInputChange}/>
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
    </section>
  )
}

export default Register
