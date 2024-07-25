import React, { useEffect, useState } from 'react'
import { insertBangGia, saveHinhAnh } from '../utils/ApiFunctions'

const AddBangGia = ({fetchBangGiaList}) => {
    const [bangGia, setBangGia] = useState({
        idBangGia: 0,
        noiDung:'',
        thoiGianBatDau:'',
        thoiGianKetThuc:'',
    })
    const[successMessage, setSuccessMessage] = useState("")
    const[errorMessage, setErrorMessage] = useState("")
    const toDatetimeLocal = (date) => {
        const ten = (i) => (i < 10 ? '0' : '') + i;
        const YYYY = date.getFullYear();
        const MM = ten(date.getMonth() + 1);
        const DD = ten(date.getDate());
        const HH = ten(date.getHours());
        const II = ten(date.getMinutes());
        return `${YYYY}-${MM}-${DD}T${HH}:${II}`;
      };
    const handleBangGiaInputChange = (e)=>{
        const name = e.target.name
        let value = e.target.value
        // if((name==="thoiGianBatDau"||name==="thoiGianKetThuc")){
        //     console.log(value)
            
        //     const dateObject = new Date(value)
        //     const dateObjectUTC = new Date (dateObject.getTime() - 7 * 60 * 60 * 1000)
        //     value = toDatetimeLocal(dateObjectUTC)
        //     console.log(value)
        // }
        setBangGia({...bangGia, [name]:value})
        // console.log("Change")
        // console.log(bangGia)
    }
    
    const handleSubmit = async(e) =>{
        e.preventDefault()
        try{
            const success = await insertBangGia(bangGia)
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
