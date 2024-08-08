import React, { useEffect, useState } from 'react'
import { insertDichVu, saveHinhAnh } from '../utils/ApiFunctions'

const AddDichVu = ({fetchDichVuList}) => {
    const [dichVu, setDichVu] = useState({
        idDichVu: 0,
        tenDichVu:'',
        ghiChu:'',
        chuKy:30,
        giaHienTai:100000,
    })
    const[successMessage, setSuccessMessage] = useState("")
    const[errorMessage, setErrorMessage] = useState("")
    const handleDichVuInputChange = (e)=>{
        const name = e.target.name
        let value = e.target.value
        if(name==="giaThue"){
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
            setSuccessMessage("Thêm dịch vụ thành công")
            setDichVu({
                idDichVu: 0,
                tenDichVu:'',
                ghiChu:'',
                chuKy:30,
                giaHienTai:100000,
            })
            setTimeout(()=>{
                setSuccessMessage("")
                setErrorMessage("")
                fetchDichVuList()
                return;
            },3000)
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
                        id='ghiChu'
                        name='ghiChu'
                        value={dichVu.ghiChu}
                        onChange={handleDichVuInputChange}/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='chuKy' className='form-label'>Chu kỳ thanh toán (Ngày)</label>
                        <input
                        required
                        className='form-control'
                        type='number'
                        min='0'
                        max='360'
                        step='30'
                        id='chuKy'
                        name='chuKy'
                        value={dichVu.chuKy}
                        onChange={handleDichVuInputChange}/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='giaHienTai' className='form-label'>Giá định kỳ (VNĐ)</label>
                        <input
                        className='form-control'
                        required
                        type='number'
                        min='0'
                        step='1000'
                        id='giaHienTai'
                        name='giaHienTai'
                        value={dichVu.giaHienTai}
                        onChange={handleDichVuInputChange}/>
                    </div>
                    {successMessage&&(
                    <div className='alert alert-success fade show'>{successMessage}</div>
                    )}
                    {errorMessage&&(
                        <div className='alert alert-danger fade show'>{errorMessage}</div>
                    )}
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
