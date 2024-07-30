import React, { useEffect, useState } from 'react'
import { insertQuyen, updateQuyen} from '../utils/ApiFunctions'

const AddQuyen = ({fetchQuyenList, quyen, setQuyen}) => {
    
    const[successMessage, setSuccessMessage] = useState("")
    const[errorMessage, setErrorMessage] = useState("")
    const handleInputChange = (e)=>{
        const name = e.target.name
        let value = e.target.value
        setQuyen({...quyen, [name]:value})
    }
    const handleRegister = async(e) =>{
        e.preventDefault()
        try{
            const success = await insertQuyen(quyen)
            console.log(success)
            setSuccessMessage('Thêm thành công')
            setTimeout(()=>{
                setSuccessMessage("")
                setQuyen({
                    idQuyen:0,
                    tenQuyen:''
                })
                fetchQuyenList()
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
            const success = await updateQuyen(quyen)
            setSuccessMessage("Sửa thành công")
        }
        catch(error){
            setErrorMessage(error.message)
        }
        setTimeout(()=>{
            setSuccessMessage("")
            setErrorMessage("")
            setQuyen({
                idQuyen:0,
                tenQuyen:''
            })
            fetchQuyenList()
        },1000)
    }

    const handleNew=()=>{
        setQuyen({
            idQuyen:0,
            tenQuyen:''
        })
    }

    return (
    <>
    <section className='container, mt-5 mb-5'>
        <div className='row justify-content-center'>
            <div className='col-md-8 col-lg-6'>
                <h2 className='mt-5 mb-2'>Tạo quyền mới trên hệ thống</h2>
                
                <form onSubmit={handleRegister}>
                    <div className='row mb-3'>
                        <label htmlFor='tenQuyen' className='col-sm-2 col-form-label'>
                            Tên quyền
                        </label>
                        <div>
                            <input
                            required
                            id='tenQuyen'
                            name='tenQuyen'
                            type='text'
                            maxLength='15'
                            className='form-control'
                            value={quyen.tenQuyen}
                            onChange={handleInputChange}/>
                        </div>
                    </div>
                    <div className='mb-3'>
                    {errorMessage&&<p className='alert alert-danger'>{errorMessage}</p>}
                    {successMessage&&<p className='alert alert-success'>{successMessage}</p>}
                        
                        {quyen.idQuyen===0?(
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

export default AddQuyen
