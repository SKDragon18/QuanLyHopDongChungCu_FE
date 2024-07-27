import React, { useEffect, useState } from 'react'
import { insertCanHo, saveHinhAnh } from '../utils/ApiFunctions'
import LoaiPhongSelector from '../common/LoaiPhongSelector'

const AddCanHo = ({fetchCanHoList}) => {
    const [canHo, setCanHo] = useState({
        idCanHo: 0,
        soPhong:'100',
        tang:0,
        dienTich:10,
        tienNghi:'',
        moTa:'',
        giaThue:100000,
        loaiPhong:{
            idLoaiPhong:0,
            tenLoaiPhong:''
        },
        lo:'A',
        chuKy:30
    })
    const[imageSave,setImageSave]=useState("")
    const[imagePreview, setImagePreview] = useState("")
    const[successMessage, setSuccessMessage] = useState("")
    const[errorMessage, setErrorMessage] = useState("")
    const handleCanHoInputChange = (e)=>{
        const name = e.target.name
        let value = e.target.value
        if(name==="dienTich"){
            if(!isNaN(value)){
                value = parseFloat(value)
            }
            else{
                value = 0
            }
        }
        if(name==="giaThue"){
            if(!isNaN(value)){
                value = parseFloat(value)
            }
            else{
                value = 0
            }
        }
        if(name==="loaiPhong"){
            value={
                idLoaiPhong:parseInt(value),
                tenLoaiPhong:''
            }
        }
        setCanHo({...canHo, [name]:value})
    }
    const handleImageChange = (e) =>{
        const selectedImage = e.target.files[0]
        setImageSave(selectedImage)
        setImagePreview(URL.createObjectURL(selectedImage))
    }
    const saveImage = async(data)=>{
        if(imagePreview){
            try{
                const success = await saveHinhAnh(imageSave,data.idCanHo)
                setImageSave("")
                setSuccessMessage(success)
                setCanHo({
                    idCanHo: 0,
                    soPhong:0,
                    tang:0,
                    dienTich:0,
                    tienNghi:'',
                    moTa:'',
                    giaThue:0,
                    loaiPhong:{
                        idLoaiPhong:0,
                        tenLoaiPhong:''
                    }
                })
                setErrorMessage("")
            }
            catch(error){
                setErrorMessage(error.message)
            }
        }
        else{
            setSuccessMessage("Thêm căn hộ thành công")
            setErrorMessage("")
        }
        setTimeout(()=>{
            setSuccessMessage("")
            setErrorMessage("")
            fetchCanHoList()
          },3000)
    }
    const handleSubmit = async(e) =>{
        e.preventDefault()
        try{
            const success = await insertCanHo(canHo)
            
            if(success !== undefined){
                setSuccessMessage("Thêm căn hộ thành công")
                saveImage(success)
            }
            else{
                setErrorMessage("Thêm căn hộ thất bại")
            }
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
                <h2 className='mt-5 mb-2'>Thêm căn hộ</h2>
                
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='soPhong' className='form-label'>Số phòng</label>
                        <input
                        className='form-control'
                        required
                        maxLength='3'
                        id='soPhong'
                        name='soPhong'
                        value={canHo.soPhong}
                        onChange={handleCanHoInputChange}/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='tang' className='form-label'>Tầng</label>
                        <input
                        className='form-control'
                        required
                        type='number'
                        min='0'
                        id='tang'
                        name='tang'
                        value={canHo.tang}
                        onChange={handleCanHoInputChange}/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='lo' className='form-label'>Lô/ Khu</label>
                        <input
                        className='form-control'
                        id='lo'
                        name='lo'
                        maxLength='1'
                        value={canHo.lo}
                        onChange={handleCanHoInputChange}/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='loaiPhong' className='form-label'>Loại phòng</label>
                        <div>
                            <LoaiPhongSelector 
                            handleCanHoInputChange={handleCanHoInputChange}/>
                        </div>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='dienTich' className='form-label'>Diện tích</label>
                        <input
                        required
                        className='form-control'
                        type='number'
                        min='0'
                        step='0.01'
                        id='dienTich'
                        name='dienTich'
                        value={canHo.dienTich}
                        onChange={handleCanHoInputChange}/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='tienNghi' className='form-label'>Tiện nghi</label>
                        <input
                        className='form-control'
                        id='tienNghi'
                        name='tienNghi'
                        value={canHo.tienNghi}
                        onChange={handleCanHoInputChange}/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='moTa' className='form-label'>Mô tả</label>
                        <input
                        className='form-control'
                        id='moTa'
                        name='moTa'
                        value={canHo.moTa}
                        onChange={handleCanHoInputChange}/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='giaThue' className='form-label'>Giá thuê</label>
                        <input
                        className='form-control'
                        required
                        type='number'
                        min='0'
                        step='1000'
                        id='giaThue'
                        name='giaThue'
                        value={canHo.giaThue}
                        onChange={handleCanHoInputChange}/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='chuKy' className='form-label'>Chu kỳ</label>
                        <input
                        className='form-control'
                        required
                        type='number'
                        min='30'
                        max='365'
                        step='1'
                        id='chuKy'
                        name='chuKy'
                        value={canHo.chuKy}
                        onChange={handleCanHoInputChange}/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='image' className='form-label'>Hình ảnh</label>
                        <input
                        className='form-control'
                        type='file'
                        id='image'
                        name='image'
                        onChange={handleImageChange}/>
                        {imagePreview&&(
                            <img src ={imagePreview}
                            alt='Preview hình ảnh căn hộ'
                            style={{maxWidth:"400px", maxHeight:"400px"}}
                            className='mb-3'/>
                        )}
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

export default AddCanHo
