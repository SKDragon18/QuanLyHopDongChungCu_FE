import React, { useEffect, useState } from 'react'
import { insertDieuKhoan, updateDieuKhoan} from '../utils/ApiFunctions'

const AddDieuKhoan = ({fetchDieuKhoanList, dieuKhoan, setDieuKhoan}) => {
    
    const[successMessage, setSuccessMessage] = useState("")
    const[errorMessage, setErrorMessage] = useState("")
    const handleInputChange = (e)=>{
        const name = e.target.name
        let value = e.target.value
        setDieuKhoan({...dieuKhoan, [name]:value})
    }
    const handleRegister = async(e) =>{
        e.preventDefault()
        try{
            const success = await insertDieuKhoan(dieuKhoan)
            console.log(success)
            setSuccessMessage('Thêm thành công')
            setTimeout(()=>{
                setSuccessMessage("")
                setDieuKhoan({
                    ma:'New',
                    noiDung:''
                })
                fetchDieuKhoanList()
            },3000)
        }
        catch(error){
            setErrorMessage(error.message)
        }
        setTimeout(()=>{
            setErrorMessage("")
        },3000)
    }

    const handleEdit = async(e) =>{
        e.preventDefault()
        try{
            const success = await updateDieuKhoan(dieuKhoan)
            console.log(success)
            setSuccessMessage("Sửa thành công")
        }
        catch(error){
            setErrorMessage(error.message)
        }
        setTimeout(()=>{
            setSuccessMessage("")
            setErrorMessage("")
            setDieuKhoan({
                ma:'New',
                noiDung:''
            })
            fetchDieuKhoanList()
        },1000)
    }

    const handleNew=()=>{
        setDieuKhoan({
            ma:'New',
            noiDung:''
        })
    }

    return (
    <>
    <section className='container, mt-5 mb-5'>
        <div className='row justify-content-center'>
            <div className='col-md-8 col-lg-6'>
                <h2 className='mt-5 mb-2'>Tạo điều khoản</h2>
                
                <form onSubmit={handleRegister}>
                <div className='row mb-3'>
                        <label htmlFor='ma' className='col-sm-4 col-form-label'>
                            Mã
                        </label>
                        <div>
                            <input
                            readOnly
                            id='ma'
                            name='ma'
                            type='text'
                            className='form-control'
                            value={dieuKhoan.ma}
                            onChange={handleInputChange}/>
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <label htmlFor='noiDung' className='col-sm-4 col-form-label'>
                            Nội dung điều khoản
                        </label>
                        <div>
                            <input
                            required
                            id='noiDung'
                            name='noiDung'
                            type='text'
                            className='form-control'
                            value={dieuKhoan.noiDung}
                            onChange={handleInputChange}/>
                        </div>
                    </div>
                    <div className='mb-3'>
                    {errorMessage&&<p className='alert alert-danger'>{errorMessage}</p>}
                    {successMessage&&<p className='alert alert-success'>{successMessage}</p>}
                        {dieuKhoan.ma==="New"?(
                            <button type='submit' className='btn btn-hotel'
                            style={{marginRight:'10px'}}>
                            Thêm
                            </button>
                        ):(<>
                            <button type='button' className='btn btn-warning'
                            style={{marginRight:'10px'}} onClick={handleEdit}>
                            Sửa
                            </button>
                            <button type='button' className='btn btn-primary'
                            style={{marginRight:'10px'}} onClick={handleNew}>
                            Thêm mới
                            </button>
                            </>
                        )}
                        
                    </div>
                </form>
            </div>
        </div>
    </section>
    </>
  )
}

export default AddDieuKhoan
