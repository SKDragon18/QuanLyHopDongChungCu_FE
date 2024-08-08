import React, { useEffect, useState } from 'react'
import { getBangGiaById, updateBangGia, doiHinhAnh, uploadGiaCanHo, uploadGiaDichVu } from '../utils/ApiFunctions'
import { useParams } from 'react-router-dom'
import {Link} from 'react-router-dom'
import GiaCanHo from './GiaCanHo'
import GiaDichVu from './GiaDichVu'
const EditBangGia = () => {
    const [bangGia, setBangGia] = useState({
        idBangGia: 0,
        noiDung:'',
        banQuanLy:{},
        canHoList:[],
        dichVuList:[]
    })
    const[canHoUpdateList, setCanHoUpdateList] = useState([])
    const[dichVuUpdateList, setDichVuUpdateList] = useState([])
    const[showUploadCanHo, setShowUploadCanHo] = useState(false)
    const[showUploadDichVu, setShowUploadDichVu] = useState(false)
    const {idBangGia} = useParams()
    const[successMessage, setSuccessMessage] = useState("")
    const[errorMessage, setErrorMessage] = useState("")
    const tenDangNhap = localStorage.getItem("tenDangNhap")
    const fetchBangGiaById= async()=>{
        try{
            const result = await getBangGiaById(idBangGia)
            setBangGia(result)
                setErrorMessage("")
                if(Array.isArray(result.canHoList)){
                    setCanHoUpdateList(result.canHoList)
                }
                else{
                    setCanHoUpdateList([])
                }
                if(Array.isArray(result.dichVuList)){
                    setDichVuUpdateList(result.dichVuList)
                }
                else{
                    setDichVuUpdateList([])
                }
                if(result.dichVuList.length===0){
                    setShowUploadDichVu(true)
                }
                else{
                    setShowUploadDichVu(false)
                }
                if(result.canHoList.length===0){
                    setShowUploadCanHo(true)
                }
                else{
                    setShowUploadCanHo(false)
                }
        }
        catch(error){
            setErrorMessage(error.message)
        }
    }

    useEffect(()=>{
        fetchBangGiaById()
    },[idBangGia])

    useEffect(()=>{
        setBangGia({...bangGia, ['canHoList']:canHoUpdateList})
    },[canHoUpdateList])
    useEffect(()=>{
        setBangGia({...bangGia, ['dichVuList']:dichVuUpdateList})
    },[dichVuUpdateList])

    const handleUploadCanHo = async(idBangGia)=>{
        if(bangGia.banQuanLy===null||bangGia.banQuanLy.ma!==tenDangNhap){
            alert("Bạn không phải là người tạo bảng nên không thể thực hiện thao tác chỉnh sửa!!!")
            return
        }
        try{
          const result = await uploadGiaCanHo(idBangGia)
          setSuccessMessage(result)
            fetchBangGiaById()
        }
        catch(error){
          setErrorMessage(error.message)
        }
        setTimeout(()=>{
          setSuccessMessage("")
          setErrorMessage("")
        },3000)
    }

    const handleUploadDichVu = async(idBangGia)=>{
        if(bangGia.banQuanLy===null||bangGia.banQuanLy.ma!==tenDangNhap){
            alert("Bạn không phải là người tạo bảng nên không thể thực hiện thao tác chỉnh sửa!!!")
            return
        }
        try{
          const result = await uploadGiaDichVu(idBangGia)
          setSuccessMessage(result)
            fetchBangGiaById()
        }
        catch(error){
          setErrorMessage(error.message)
        }
        setTimeout(()=>{
          setSuccessMessage("")
          setErrorMessage("")
        },3000)
    }

    const handleBangGiaInputChange = (e)=>{
        const name = e.target.name
        let value = e.target.value
        setBangGia({...bangGia, [name]:value})
    }

    const handleSubmit = async(e) =>{
        e.preventDefault()
        if(bangGia.banQuanLy===null||bangGia.banQuanLy.ma!==tenDangNhap){
            alert("Bạn không phải là người tạo bảng nên không thể thực hiện thao tác chỉnh sửa!!!")
            return
        }
        try{
            const success = await updateBangGia(bangGia)
            setSuccessMessage("Cập nhật bảng giá thành công")
            fetchBangGiaById()
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
                    <h2 className='mt-5 mb-2'>Bảng giá</h2>
                    
                    <form onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <label htmlFor='noiDung' className='form-label'>Nội dung</label>
                            <textarea
                            className='form-control'
                            id='noiDung'
                            name='noiDung'
                            rows='3'
                            value={bangGia.noiDung}
                            onChange={handleBangGiaInputChange}/>
                        </div>
                        <p></p>
                        {showUploadCanHo&&(
                                <button type='button' className='btn btn-light mx-2 mb-3'
                                onClick={()=>handleUploadCanHo(bangGia.idBangGia)}>
                                Upload hàng loạt căn hộ
                                </button>
                            )}
                        {showUploadDichVu&&(
                                <button type='button' className='btn btn-light mx-2 mb-3'
                                onClick={()=>handleUploadDichVu(bangGia.idBangGia)}>
                                Upload hàng loạt dịch vụ
                                </button>
                            )}
                        {(showUploadCanHo||showUploadDichVu)&&(
                            <p className='text-danger small'>* Upload sẽ hủy thao tác đang thực hiện</p>
                        )}
                        <div className='mb-3'>
                            <label htmlFor='canHo' className='form-label'>Căn hộ</label>
                            <GiaCanHo canHoUpdateList={canHoUpdateList} setCanHoUpdateList={setCanHoUpdateList}/>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='dichVu' className='form-label'>Dịch vụ</label>
                            <GiaDichVu dichVuUpdateList={dichVuUpdateList} setDichVuUpdateList={setDichVuUpdateList}/>
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
                            <Link className='btn btn-outline-primary mr-2 mb-3' to={`/ds-banggia`}>
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

export default EditBangGia
