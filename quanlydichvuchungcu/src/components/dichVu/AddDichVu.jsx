import React, { useState } from 'react'
import { insertDichVu } from '../utils/ApiFunctions'

const AddDichVu = () => {
    const [dichVu, setDichVu] = useState({
        idDichVu: null,
        tenDichVu:"",
        ghiChu:null,
        giaHienTai:0

    })
    const[successMessage, setSuccessMessage] = useState("")
    const[errorMessage, setErrorMessage] = useState("")
    const handleDichVuInputChange = (e)=>{
        const name = e.target.name
        let value = e.target.value
        if(name==="giaHienTai"){
            if(!isNaN(value)){
                value = parseFloat(value)
            }
            else{
                value = 0
            }
        }
        setDichVu({...dichVu, [name]:value})
    }

    const handleSubmit = async(e) =>{
        e.preventDefault()
        try{
            const success = await insertDichVu(dichVu)
            if(success !== undefined){
                setSuccessMessage("Them dich vu thanh cong")
                setDichVu({
                    idDichVu: null,
                    tenDichVu:"",
                    ghiChu:null,
                    giaHienTai:0
            
                })
                setErrorMessage("")
            }
            else{
                setErrorMessage("Loi them dich vu")
            }
        }
        catch(error){
            setErrorMessage(error.message)
        }
    }
    return (
    <>
    <section className='container, mt-5 mb-5'>
        <div className='row justify-content-center'>
            <div className='col-md-8 col-lg-6'>
                <h2 className='mt-5 mb-2'>Thêm dịch vụ</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='tenDichVu' className='form-label'>Tên dịch vụ</label>
                        <input
                        className='form-control'
                        required
                        maxLength='50'
                        id='tenDichVu'
                        name='tenDichVu'
                        value={dichVu.tenDichVu}
                        onChange={handleDichVuInputChange}/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='ghiChu' className='form-label'>Ghi chú</label>
                        <input
                        className='form-control'
                        required
                        id='ghiChu'
                        name='ghiChu'
                        value={dichVu.ghiChu}
                        onChange={handleDichVuInputChange}/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='giaHienTai' className='form-label'>Giá hiện tại</label>
                        <input
                        className='form-control'
                        required
                        id='giaHienTai'
                        name='giaHienTai'
                        type='number'
                        min='0'
                        value={dichVu.giaHienTai}
                        onChange={handleDichVuInputChange}/>
                    </div>
                    <div className='d-grid d-md-flex mt-2'>
                        <button className='btn btn-outline-primary ml-5'>
                            Lưu
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </section>
    </>
  )
}

export default AddDichVu
