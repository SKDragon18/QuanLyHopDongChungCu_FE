import React, { useState, useEffect } from 'react'
import {getHopDongDichVuKhachHang, giaHanHopDongDichVu} from '../utils/ApiFunctions'
import { useParams } from 'react-router-dom'
import { Form, FormControl } from 'react-bootstrap'
const BQLXemDichVu = () => {
    // const[isValidated, setIsValidated]= useState(false)
    const[errorMessage,setErrorMessage]=useState('')
    const[successMessage,setSuccessMessage]=useState('')
    const {idYeuCauDichVu} = useParams()
    const formatCurrency = (value, locale = 'en-US', currency = 'USD') => {
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
      }).format(value);
    };
    const formatTime = (time)=>{
      const dateObject = new Date(time)
      return dateObject.toLocaleString()
    }
    const[yeuCauDichVu, setYeuCauDichVu] = useState({
      hopDong:{
        idHopDong:0
      },
      dichVu:{},
      giaTra:0,
      ngayYeuCau:'',
      thoiHan:'',
      chuKy:0,
      trangThai:0
    })
    const [dichVu,setDichVu]=useState({
      idDichVu:0,
      tenDichVu:'',
      ghiChu:'',
      chuKy:0,
      giaHienTai:0,
      giaKhuyenMai:0,
      dieuKhoanList:[]
  })
  const [khachHang,setKhachHang]=useState({
      maKhachHang:'',
      ho:'',
      ten:'',
      sdt:'',
      email:'',
      cmnd:''
  })
  const [hopDong,setHopDong]=useState({
    idHopDong:0,
    canHo:{
      soPhong:'',
      tang:0,
      lo:''
    }
  })
    const[dieuKhoanDichVuList,setDieuKhoanDichVuList] = useState([{}])
    const fetchHopDongDichVu= async()=>{
      try{
          const result = await getHopDongDichVuKhachHang(idYeuCauDichVu)
          setYeuCauDichVu(result)
          setDichVu(result.dichVu)
          setKhachHang(result.hopDong.khachHang)
          setHopDong(result.hopDong)
          setDieuKhoanDichVuList(result.dieuKhoanList)
      }
      catch(error){
          setErrorMessage(error.message)
      }
  }
  
  useEffect(()=>{
    fetchHopDongDichVu()
  },[])

    const handlePay = async (e)=>{
      e.preventDefault()
      console.log(yeuCauDichVu)
      try{
        const success = await giaHanHopDongDichVu(idYeuCauDichVu)
        if(success.status===200){
          setSuccessMessage("Gia hạn thành công")
        }
        else{
          setErrorMessage("Gia hạn thất bại")
        }
      }
      catch(error){
        setErrorMessage(error.message)
      }
    }
    
  return (
    <>
      <div className='container mb-5'>
        <div className='row'>
          <div className='col-md-6'>
            <div className='card card-body mt-5'>
              <h4 className='card card-title text-center'>Thông tin đính kèm hợp đồng</h4>

              <Form>
                <fieldset style={{border:'2px'}}>
                  <legend>Chủ hộ</legend>
                  <Form.Group>
                    <Form.Label htmlFor='hoTen'>Họ và tên chủ hộ: </Form.Label>
                    <FormControl
                    readOnly
                    type='text'
                    id='hoTen'
                    name='hoTen'
                    value={khachHang.ho+' '+khachHang.ten}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label htmlFor='email'>Email: </Form.Label>
                    <FormControl
                    readOnly
                    type='text'
                    id='email'
                    name='email'
                    value={khachHang.email}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label htmlFor='sdt'>Số điện thoại: </Form.Label>
                    <FormControl
                    readOnly
                    type='text'
                    id='sdt'
                    name='sdt'
                    value={khachHang.sdt}
                    />
                  </Form.Group>
                  <Form.Group>
                  <Form.Label htmlFor='hopDong'>Căn hộ đăng ký dịch vụ: </Form.Label>
                  <FormControl
                    readOnly
                    type='text'
                    id='hopDong'
                    name='hopDong'
                    value={'Căn hộ '+hopDong.canHo.soPhong + ' tầng '+hopDong.canHo.tang+' khu '+hopDong.canHo.lo}
                    />
                  </Form.Group>
                </fieldset>
                <fieldset style={{border:'2px'}}>
                  <legend className='mt-3'>Thông tin dịch vụ</legend>
                  <Form.Group>
                    <div className='row'>
                      <div className='col-2'>
                      <Form.Label htmlFor='idDichVu'>ID</Form.Label>
                      <FormControl
                      readOnly
                      id='idDichVu'
                      name='idDichVu'
                      value={dichVu.idDichVu}
                      />
                      </div>
                      <div className='col-8'>
                      <Form.Label htmlFor='tenDichVu'>Tên dịch vụ</Form.Label>
                      <FormControl
                      readOnly
                      value={dichVu.tenDichVu}
                      />
                      </div>
                    </div>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label htmlFor='ghiChu'>Ghi chú: </Form.Label>
                    <FormControl
                    readOnly
                    type='text'
                    id='ghiChu'
                    name='ghiChu'
                    value={dichVu.ghiChu}
                    />
                  </Form.Group>
                </fieldset>
              </Form>
            </div>
          </div>
          <div className='col-md-6'>
              {/* {isSubmitted&&(
                <p>Form thanh toán</p>
              )} */}
              <div className='card card-body mt-5'>
              <h4 className='card card-title text-center'>Hợp đồng đăng ký dịch vụ</h4>

              <Form onSubmit={handlePay}>
                <fieldset style={{border:'2px'}}>
                  <legend>Thông tin hợp đồng</legend>
                  <div className='row'>
                    <div className='col-6'>
                    <Form.Label htmlFor='ngayYeuCau'>Bắt đầu</Form.Label>
                    <FormControl
                    readOnly
                    id='ngayYeuCau'
                    name='ngayYeuCau'
                    value={formatTime(yeuCauDichVu.ngayYeuCau)}
                    />
                    </div>
                    <div className='col-6'>
                    <Form.Label htmlFor='thoiHan'>Thời gian thanh toán tiếp theo</Form.Label>
                    <FormControl
                    readOnly
                    id='thoiHan'
                    name='thoiHan'
                    value={formatTime(yeuCauDichVu.thoiHan)}
                    />
                    </div>
                  </div>
                </fieldset>
                <fieldset style={{border:'2px'}}>
                  <div className='row'>
                    <div className='col-6'>
                    <Form.Label htmlFor='giaHienTai'>Giá đăng ký</Form.Label>
                    <FormControl
                    readOnly
                    id='giaHienTai'
                    name='giaHienTai'
                    value={formatCurrency(yeuCauDichVu.giaTra,'vi-VN', 'VND')}
                    />
                    </div>
                    <div className='col-6'>
                    <Form.Label htmlFor='chuKy'>Chu kỳ thanh toán</Form.Label>
                    <FormControl
                    readOnly
                    id='chuKy'
                    name='chuKy'
                    value={yeuCauDichVu.chuKy + ' ngày'}
                    />
                    </div>
                  </div>
                </fieldset>
                <fieldset style={{border:'2px'}}>
                  <legend>Điều khoản hợp đồng</legend>
                  <table className='table table-bordered table-hover'>
                      
                      <tbody>
                        {(!Array.isArray(dieuKhoanDichVuList)||dieuKhoanDichVuList.length===0)?
                        (
                          <tr key='no'>
                            <td colSpan="7" className='text-center'>Không có yêu cầu điều khoản</td>
                          </tr>
                        ):(dieuKhoanDichVuList.map((dieuKhoan)=>(
                          <tr key={dieuKhoan.ma} className='text-center'>
                            <td>{dieuKhoan.ma}</td>
                            <td>{dieuKhoan.noiDung}</td>
                          </tr>
                        )))}
                      </tbody>
                    </table>
                </fieldset>
                {/* {hopDong.giaHan&&(
                  <div className='form-group mt-2 mb-2'>
                    {successMessage&&(
                        <div className='alert alert-success fade show'>{successMessage}</div>
                        )}
                        {errorMessage&&(
                            <div className='alert alert-danger fade show'>{errorMessage}</div>
                        )}
                    <button type='submit' className='btn btn-danger'>
                      Xác nhận thanh toán và gia hạn hợp đồng
                    </button>
                  </div>
                )} */}
              </Form>
              
                
                
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BQLXemDichVu
