import React, { useContext, useState } from 'react'
import { loginUser } from '../utils/ApiFunctions'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import AuthProvider, { AuthContext, useAuth } from './AuthProvider'

const Login = () => {
    const[errorMessage, setErrorMessage] = useState('')
    const[login, setLogin] = useState({
        tenDangNhap:'',
        matKhau:''
    })
    const navigate = useNavigate()
    const auth = useAuth()
    const location = useLocation()
    const redirectUrl = location.state?.path||"/"
    // const {handleLogin} = useContext(AuthContext)
    const handleInputChange = (e)=>{
        setLogin({...login, [e.target.name]:e.target.value})
    }
    const handleSubmit = async(e)=>{
        e.preventDefault()
        const success = await loginUser(login)
        if(success.code===200){
            const data = success.result
            auth.handleLogin(data)
            console.log(data)
            navigate(redirectUrl,{replace:true})
        }
        else{
            setErrorMessage(success.message)
        }
        setTimeout(()=>{
            setErrorMessage('')
        },4000)
    }
  return (
    <section className='container col-6 mt-5 mb-5'>
      {errorMessage&&<p className='alert alert-danger'>{errorMessage}</p>}
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
            <div className='row mb-3'>
                <label htmlFor='tenDangNhap' className='col-sm-2 col-form-label'>
                    Tên đăng nhập
                </label>
                <div>
                    <input
                    id='tenDangNhap'
                    name='tenDangNhap'
                    type='text'
                    className='form-control'
                    value={login.tenDangNhap}
                    onChange={handleInputChange}/>
                </div>
            </div>
            <div className='row mb-3'>
                <label htmlFor='matKhau' className='col-sm-2 col-form-label'>
                    Mật khẩu
                </label>
                <div>
                    <input
                    id='matKhau'
                    name='matKhau'
                    type='password'
                    className='form-control'
                    value={login.matKhau}
                    onChange={handleInputChange}/>
                </div>
            </div>
            <div className='mb-3'>
                <button type='submit' className='btn btn-hotel'
                style={{marginRight:'10px'}}>
                Đăng nhập
                </button>
                <span style={{marginLeft:"10px"}}>
                   <Link to={'/register'}>Đăng ký ngay</Link>
                </span>
                <span style={{marginLeft:"10px"}}>
                   <Link to={'/forgot'} className='text-danger'>Quên mật khẩu?</Link>
                </span>
            </div>
        </form>
    </section>
  )
}

export default Login
