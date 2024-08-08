import React, { useEffect, useState } from 'react'
import { getBanQuanLyById, insertBangGia} from '../utils/ApiFunctions'

const AddBangGia = ({fetchBangGiaList}) => {
    const [bangGia, setBangGia] = useState({
        idBangGia: 0,
        noiDung:'',
        thoiGianBatDau:'',
        thoiGianKetThuc:'',
        banQuanLy:{}
    })
    const tenDangNhap = localStorage.getItem("tenDangNhap")
    const[successMessage, setSuccessMessage] = useState("")
    const[errorMessage, setErrorMessage] = useState("")
    const fetchBanQuanLy = async()=>{
        try{
            const result = await getBanQuanLyById(tenDangNhap)
            setBangGia({...bangGia,['banQuanLy']:result})
        }catch(error){
            setErrorMessage(error.message)
            setTimeout(()=>{
                setErrorMessage("")
              },3000)
        }
    }
    useEffect(()=>{
        fetchBanQuanLy()
    },[tenDangNhap])
    
    const handleBangGiaInputChange = (e)=>{
        const name = e.target.name
        let value = e.target.value
        setBangGia({...bangGia, [name]:value})
    }
    
    const handleSubmit = async(e) =>{
        e.preventDefault()
        const bangGiaCopy = {...bangGia}
        const thoiGianBatDau = new Date(bangGia.thoiGianBatDau)
        const thoiGianKetThuc = new Date(bangGia.thoiGianKetThuc)
        thoiGianBatDau.setHours(thoiGianBatDau.getHours())
        thoiGianKetThuc.setHours(thoiGianKetThuc.getHours())
        bangGiaCopy.thoiGianBatDau = thoiGianBatDau.toISOString().slice(0, 16)
        bangGiaCopy.thoiGianKetThuc = thoiGianKetThuc.toISOString().slice(0, 16)
        try{
            const success = await insertBangGia(bangGiaCopy)
            setSuccessMessage("Thêm bảng giả thành công")
                setBangGia({
                    idBangGia: 0,
                    noiDung:'',
                    thoiGianBatDau:'',
                    thoiGianKetThuc:'',
                })
                setTimeout(()=>{
                    setSuccessMessage("")
                    setErrorMessage("")
                    fetchBangGiaList()
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
                <h2 className='mt-5 mb-2'>Thêm bảng giá</h2>
                
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='noiDung' className='form-label'>Nội dung</label>
                        <input
                        className='form-control'
                        id='noiDung'
                        name='noiDung'
                        value={bangGia.noiDung}
                        onChange={handleBangGiaInputChange}/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='thoiGianBatDau' className='form-label'>Thời gian bắt đầu</label>
                        <input
                        className='form-control'
                        id='thoiGianBatDau'
                        name='thoiGianBatDau'
                        type='datetime-local'
                        value={bangGia.thoiGianBatDau}
                        onChange={handleBangGiaInputChange}/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='thoiGianKetThuc' className='form-label'>Thời gian kết thúc</label>
                        <input
                        className='form-control'
                        id='thoiGianKetThuc'
                        name='thoiGianKetThuc'
                        type='datetime-local'
                        value={bangGia.thoiGianKetThuc}
                        onChange={handleBangGiaInputChange}/>
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

export default AddBangGia
