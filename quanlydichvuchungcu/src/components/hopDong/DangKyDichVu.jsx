import React, { useState, useEffect } from 'react'
import {dangKyDichVu, getDichVuChoDangKyById, getKhachHangById, getAllHopDongKhachHang, createPayment, checkPayment, checkHopDongDichVu} from '../utils/ApiFunctions'
import { useParams } from 'react-router-dom'
import { Form, FormControl } from 'react-bootstrap'
const DangKyDichVu = () => {
    // const[isValidated, setIsValidated]= useState(false)
    const[isSubmitted, setIsSubmitted] = useState(false)
    const[errorMessage,setErrorMessage]=useState('')
    const[successMessage,setSuccessMessage]=useState('')
    const {idDichVu} = useParams()
    const [ma] = useState(localStorage.getItem("tenDangNhap"))
    const formatCurrency = (value, locale = 'en-US', currency = 'USD') => {
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
      }).format(value);
    };
    const [urlPay,setUrlPay]=useState('')
    const[yeuCauDichVu, setYeuCauDichVu] = useState({
      idYeuCauDichVu:0,
      soHoaDon:0,
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
  const [hopDongList,setHopDongList]=useState([{
    idHopDong:0,
    canHo:{
      soPhong:'',
      tang:0,
      lo:''
    }
  }])
    const[dieuKhoanDichVuList,setDieuKhoanDichVuList] = useState([{}])
    const fetchDichVuById= async()=>{
      try{
          const result = await getDichVuChoDangKyById(idDichVu)
          setDichVu(result)
      }
      catch(error){
          setErrorMessage(error.message)
      }
  }
  const fetchKhachHangById= async()=>{
    try{
        const result = await getKhachHangById(ma)
        setKhachHang(result)
        setTimeout(()=>{
          setSuccessMessage("")
          setErrorMessage("")
      },3000)
    }
    catch(error){
        setErrorMessage(error.message)
    }
  }
  const fetchHopDongById= async()=>{
    try{
        const result = await getAllHopDongKhachHang(ma)
        setHopDongList(result)
        setTimeout(()=>{
          setSuccessMessage("")
          setErrorMessage("")
      },3000)
    }
    catch(error){
        setErrorMessage(error.message)
    }
  }
  useEffect(()=>{
    fetchDichVuById()
    fetchKhachHangById()
    fetchHopDongById()
  },[])
  useEffect(()=>{
    const ngayYeuCau = new Date();
    const thoiHan = new Date();
    thoiHan.setDate(thoiHan.getDate()+dichVu.chuKy);
    const giaTri = (dichVu.giaKhuyenMai===null)?dichVu.giaHienTai:dichVu.giaKhuyenMai
    setYeuCauDichVu(yeuCauDichVu=>({...yeuCauDichVu,['dichVu']:dichVu,['giaTra']:giaTri,
      ['ngayYeuCau']:ngayYeuCau.toISOString().slice(0, 16),
      ['thoiHan']:thoiHan.toISOString().slice(0, 16)
    }))
    setDieuKhoanDichVuList(dichVu.dieuKhoanList)
  },[dichVu])
  useEffect(()=>{
    if(Array.isArray(hopDongList)&&hopDongList.length>0){
      setYeuCauDichVu({...yeuCauDichVu,['hopDong']:hopDongList[0]})
    }
  },[hopDongList])

    const handleInputChange=(e)=>{
        const{name,value} = e.target
        if(name==='hopDong'){
          setIsSubmitted(false)
          setUrlPay('')
          const hopDongChon = ({
            idHopDong:value
          })
          setYeuCauDichVu({...yeuCauDichVu,[name]:hopDongChon})
          setErrorMessage("")
        }
        else{
          setYeuCauDichVu({...yeuCauDichVu,[name]:value})
          setErrorMessage("")
        }
        
    }
    const handleSubmit=async ()=>{
      try{
        const success = await checkHopDongDichVu(yeuCauDichVu)
        if(success==="Hợp lệ"){
          setIsSubmitted(true)
          setUrlPay('')
        }
        else{
          setIsSubmitted(false)
          setUrlPay('')
        }
      }
      catch(error){
        setErrorMessage(error.message)
        setIsSubmitted(false)
        setUrlPay('')
      }
      setTimeout(()=>{
        setErrorMessage("")
      },3000)
    }
    const handlePay = async (e)=>{
      if(yeuCauDichVu.hopDong.idHopDong===0){
        return;
      }
      e.preventDefault()
      console.log(yeuCauDichVu)
      try{
        const success = await createPayment(String(yeuCauDichVu.giaTra))
        setYeuCauDichVu({...yeuCauDichVu,['soHoaDon']:success.soHoaDon})
        setUrlPay(success.url)
      }
      catch(error){
        setErrorMessage(error.message)
      }
      setTimeout(()=>{
        setErrorMessage("")
      },3000)
      
      
    }
    const dangKy = async(e)=>{
      e.preventDefault()
      try{
        const success = await dangKyDichVu(yeuCauDichVu)
        setSuccessMessage(success)
        setTimeout(()=>{
          window.location.href='/hopdong'
        },2000)
      }
      catch(error){
        setErrorMessage(error.message)
      }
      setTimeout(()=>{
        setSuccessMessage("")
        setErrorMessage("")
      },3000)
    }
    const check = async (e)=>{
      e.preventDefault()
      try{
        if(yeuCauDichVu.soHoaDon===0)return;
        console.log(yeuCauDichVu.soHoaDon)
        const success = await checkPayment(yeuCauDichVu.soHoaDon)
        console.log(success)
        if(success==='1'){
          dangKy(e)
        }
        else if(success==='0'){
          setErrorMessage("Thanh toán thất bại")
        }
        else{
          setErrorMessage("Lỗi: Đã mất hóa đơn")
        }
      }
      catch(error){
        setErrorMessage(error.message)
      }
      setTimeout(()=>{
        setErrorMessage("")
      },3000)
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
                  <Form.Label htmlFor='hopDong'>Chọn hợp đồng đã có: </Form.Label>
                  {Array.isArray(hopDongList)&&hopDongList.length>0&&(
                    <select
                    required
                    className='form-control'
                    id='hopDong'
                    name='hopDong'
                    onChange={handleInputChange}
                    value={yeuCauDichVu.hopDong.idHopDong}>
                      {
                          hopDongList.map((val, key)=>{
                            if(!val.trangThai){
                              return(
                                <option key={key} value={val.idHopDong}>
                                    {'Căn hộ '+val.canHo.soPhong + ' tầng '+val.canHo.tang+' khu '+val.canHo.lo}
                                </option>)
                            }
                            
                          })}
                          
                  </select>
                  )}
                    
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
                    type='datetime-local'
                    id='ngayYeuCau'
                    name='ngayYeuCau'
                    value={yeuCauDichVu.ngayYeuCau}
                    />
                    </div>
                    <div className='col-6'>
                    <Form.Label htmlFor='thoiHan'>Kết thúc</Form.Label>
                    <FormControl
                    readOnly
                    type='datetime-local'
                    id='thoiHan'
                    name='thoiHan'
                    value={yeuCauDichVu.thoiHan}
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
                    value={(dichVu.giaKhuyenMai!==null?formatCurrency(dichVu.giaKhuyenMai,'vi-VN', 'VND')
                      :formatCurrency(dichVu.giaHienTai,'vi-VN', 'VND'))}
                    />
                    </div>
                    <div className='col-6'>
                    <Form.Label htmlFor='chuKy'>Chu kỳ</Form.Label>
                    <FormControl
                    readOnly
                    id='chuKy'
                    name='chuKy'
                    value={dichVu.chuKy + ' ngày'}
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
                <div className='form-group mt-2 mb-2'>
                  <button type='button' className='btn btn-hotel'
                  onClick={()=>{
                    handleSubmit()
                  }}>
                    Xác nhận đăng ký
                  </button>
                </div>
                {isSubmitted&&(
                  <div className='form-group mt-2 mb-2'>
                    
                    <button type='submit' className='btn btn-hotel'
                    >
                      Xác nhận thanh toán
                    </button>
                  </div>
                )}
              </Form>
              {urlPay!==''&&(
              <a href={urlPay} className='btn btn-primary mb-3 mt-3' target="_blank" rel="noopener noreferrer">
                Đến VNPay
              </a>
              )}
              {urlPay!==''&&(
              <button type='button' className='btn btn-hotel' onClick={check}>
                Nhận kết quả
              </button>
              )}
              {successMessage&&(
                  <div className='alert alert-success fade show'>{successMessage}</div>
              )}
              {errorMessage&&(
                  <div className='alert alert-danger fade show'>{errorMessage}</div>
              )}
                
                
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DangKyDichVu
