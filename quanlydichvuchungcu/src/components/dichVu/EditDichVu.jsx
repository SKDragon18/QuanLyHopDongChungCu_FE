import React, { useEffect, useState } from 'react'
import { getDichVuById, updateDichVu, doiHinhAnh } from '../utils/ApiFunctions'
import { useParams } from 'react-router-dom'
import {Link} from 'react-router-dom'
import DieuKhoanSelector from '../common/DieuKhoanSelector'
const EditDichVu = () => {
    const [dichVu, setDichVu] = useState({
        idDichVu: 0,
        tenDichVu:'',
        ghiChu:'',
        chuKy:30,
        giaHienTai:100000,
        dieuKhoanList:[]
    })
    const[dieuKhoanDichVuList, setDieuKhoanDichVuList] = useState([])
    const {idDichVu} = useParams()
    const[successMessage, setSuccessMessage] = useState("")
    const[errorMessage, setErrorMessage] = useState("")
    
    useEffect(()=>{
        const fetchDichVuById= async()=>{
            try{
                const result = await getDichVuById(idDichVu)
                setDichVu(result)
                setErrorMessage("")
                if(Array.isArray(result.dieuKhoanList)){
                    setDieuKhoanDichVuList(result.dieuKhoanList)
                }
                else{
                    setDieuKhoanDichVuList([])
                }
            }
            catch(error){
                setErrorMessage(error.message)
            }
        }
        fetchDichVuById()
        
    },[idDichVu])
    useEffect(()=>{
        setDichVu({...dichVu, ['dieuKhoanList']:dieuKhoanDichVuList})
    },[dieuKhoanDichVuList])


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
            console.log('Tạo')
            console.log(dichVu)
            const success = await updateDichVu(dichVu)
            console.log(dichVu)
            setSuccessMessage("Cập nhật dịch vụ thành công")
            setDichVu(success)
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
                    <h2 className='mt-5 mb-2'>Dịch vụ</h2>
                    
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
                            max='365'
                            step='1'
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
                        <div className='mb-3'>
                            <label htmlFor='dieuKhoan' className='form-label'>Điều khoản</label>
                            <DieuKhoanSelector dieuKhoanUpdateList={dieuKhoanDichVuList} setDieuKhoanUpdateList={setDieuKhoanDichVuList}/>
                        </div>
                        
                        {successMessage&&(
                        <div className='alert alert-success fade show'>{successMessage}</div>
                        )}
                        {errorMessage&&(
                            <div className='alert alert-danger fade show'>{errorMessage}</div>
                        )}
                        <div className='d-grid d-md-flex mt-2'>
                            <button type='submit' className='btn btn-outline-warning mx-2 mb-3'>
                                Lưu
                            </button>
                            <Link className='btn btn-outline-primary mr-2 mb-3' to={`/ds-dichvu`}>
                                <span >
                                    Trở về
                                </span>
                            </Link>
                            
                        </div>
                        
                    </form>
                </div>
            </div>
        </section>
        </>
    )
}

export default EditDichVu
