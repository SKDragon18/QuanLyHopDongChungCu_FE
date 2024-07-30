import React, { useEffect, useState } from 'react'
import { insertLoaiPhong, updateLoaiPhong} from '../utils/ApiFunctions'

const AddLoaiPhong = ({fetchLoaiPhongList, loaiPhong, setLoaiPhong}) => {
    
    const[successMessage, setSuccessMessage] = useState("")
    const[errorMessage, setErrorMessage] = useState("")
    const handleInputChange = (e)=>{
        const name = e.target.name
        let value = e.target.value
        setLoaiPhong({...loaiPhong, [name]:value})
    }
    const handleRegister = async(e) =>{
        e.preventDefault()
        try{
            const success = await insertLoaiPhong(loaiPhong)
            console.log(success)
            setSuccessMessage('Thêm thành công')
            setTimeout(()=>{
                setSuccessMessage("")
                setLoaiPhong({
                    idLoaiPhong:0,
                    tenLoaiPhong:''
                })
                fetchLoaiPhongList()
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
            const success = await updateLoaiPhong(loaiPhong)
            setSuccessMessage("Sửa thành công")
        }
        catch(error){
            setErrorMessage(error.message)
        }
        setTimeout(()=>{
            setSuccessMessage("")
            setErrorMessage("")
            setLoaiPhong({
                idLoaiPhong:0,
                tenLoaiPhong:''
              })
            fetchLoaiPhongList()
        },3000)
    }

    const handleNew=()=>{
        setLoaiPhong({
            idLoaiPhong:0,
            tenLoaiPhong:''
        })
    }


    return (
    <>
    <section className='container, mt-5 mb-5'>
        <div className='row justify-content-center'>
            <div className='col-md-8 col-lg-6'>
                <h2 className='mt-5 mb-2'>Tạo loại phòng mới</h2>
                
                <form onSubmit={handleRegister}>
                    <div className='row mb-3'>
                        <label htmlFor='tenLoaiPhong' className='col-sm-4 col-form-label'>
                            Tên loại phòng
                        </label>
                        <div>
                            <input
                            required
                            id='tenLoaiPhong'
                            name='tenLoaiPhong'
                            type='text'
                            maxLength='20'
                            className='form-control'
                            value={loaiPhong.tenLoaiPhong}
                            onChange={handleInputChange}/>
                        </div>
                    </div>
                    <div className='mb-3'>
                    {errorMessage&&<p className='alert alert-danger'>{errorMessage}</p>}
                    {successMessage&&<p className='alert alert-success'>{successMessage}</p>}
                        {loaiPhong.idLoaiPhong===0?(
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

export default AddLoaiPhong
