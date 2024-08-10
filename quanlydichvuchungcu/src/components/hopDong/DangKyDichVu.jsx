import React, { useState, useEffect } from 'react'
import {dangKyDichVu, getDichVuChoDangKyById, getKhachHangById, getAllHopDongKhachHang, createPayment, checkPayment, checkHopDongDichVu} from '../utils/ApiFunctions'
import { useParams } from 'react-router-dom'
import { Form, FormControl } from 'react-bootstrap'
import {formatCurrency} from '../utils/FormatValue'
const DangKyDichVu = () => {
    // const[isValidated, setIsValidated]= useState(false)
    const[isSubmitted, setIsSubmitted] = useState(false)
    const[errorMessage,setErrorMessage]=useState('')
    const[successMessage,setSuccessMessage]=useState('')
    const {idDichVu} = useParams()
    const [ma] = useState(localStorage.getItem("tenDangNhap"))
    const [role]= useState(localStorage.getItem("role"))
    const[yeuCauDichVu, setYeuCauDichVu] = useState({
      idYeuCauDichVu:0,
      khachHang:{},
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
  useEffect(()=>{
    fetchDichVuById()
    fetchKhachHangById()
  },[])

  const [today] = useState(new Date());
  const [todayString] = useState(today.toISOString().slice(0, 16));
  const [day7after] = useState(new Date());
  day7after.setDate(today.getDate()+7);
  const [day7afterString] = useState(day7after.toISOString().slice(0, 16));

  useEffect(()=>{
    if(yeuCauDichVu.ngayYeuCau!==''){
      const thoiHan = new Date(yeuCauDichVu.ngayYeuCau);
      thoiHan.setDate(thoiHan.getDate()+dichVu.chuKy);
      setYeuCauDichVu(yeuCauDichVu=>({...yeuCauDichVu,['thoiHan']:thoiHan.toISOString().slice(0, 16)
      }))
    }
  },[yeuCauDichVu.ngayYeuCau])

  useEffect(()=>{
    const giaTri = (dichVu.giaKhuyenMai===null)?dichVu.giaHienTai:dichVu.giaKhuyenMai
    setYeuCauDichVu(yeuCauDichVu=>({...yeuCauDichVu,['dichVu']:dichVu,['giaTra']:giaTri
    }))
    setDieuKhoanDichVuList(dichVu.dieuKhoanList)
  },[dichVu])

  useEffect(()=>{
    setYeuCauDichVu(yeuCauDichVu=>({...yeuCauDichVu, ['khachHang']:khachHang}))
  },[khachHang])


    const handleInputChange=(e)=>{
        const{name,value} = e.target
        setYeuCauDichVu({...yeuCauDichVu,[name]:value})
    }
    const handleSubmit=async (e)=>{
      e.preventDefault()
      try{
        const success = await checkHopDongDichVu(yeuCauDichVu)
        if(success==="Hợp lệ"){
          setIsSubmitted(true)
        }
        else{
          setIsSubmitted(false)
        }
      }
      catch(error){
        setErrorMessage(error.message)
        setIsSubmitted(false)
      }
      setTimeout(()=>{
        setErrorMessage("")
      },3000)
    }
    const handleDangKy = async ()=>{
      console.log(yeuCauDichVu)
      const yeuCauDichVuCopy = {...yeuCauDichVu}
      const thoiHan = new Date(yeuCauDichVu.thoiHan)
      const ngayYeuCau = new Date(yeuCauDichVu.ngayYeuCau)
      thoiHan.setHours(thoiHan.getHours())
      ngayYeuCau.setHours(ngayYeuCau.getHours())
      yeuCauDichVuCopy.thoiHan = thoiHan.toISOString().slice(0, 16)
      yeuCauDichVuCopy.ngayYeuCau = ngayYeuCau.toISOString().slice(0, 16)
      try{
        const success = await dangKyDichVu(yeuCauDichVuCopy)
        setSuccessMessage(success)
        setTimeout(()=>{
          setSuccessMessage("")
          window.location.href='/hopdong'
        },3000)
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
                  {/* <Form.Group>
                  <Form.Label htmlFor='hopDong'>Chọn hợp đồng đã có: </Form.Label>
                  {Array.isArray(hopDongList)&&hopDongList.length>0&&(
                    <select
                    required
                    className='form-control'
                    id='hopDong'
                    name='hopDong'
                    onChange={handleInputChange}
                    value={yeuCauDichVu.hopDong.idHopDong}>
                      <option key='0' value={0}>
                      Chọn căn hộ đang thuê
                      </option>
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
                    
                  </Form.Group> */}
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

              <Form onSubmit={handleSubmit}>
                <fieldset style={{border:'2px'}}>
                  <legend>Thông tin hợp đồng</legend>
                  <div className='row'>
                    <div className='col-6'>
                    <Form.Label htmlFor='ngayYeuCau'>Bắt đầu</Form.Label>
                    <FormControl
                    required
                    type='datetime-local'
                    id='ngayYeuCau'
                    name='ngayYeuCau'
                    min={todayString}
                    max={day7afterString}
                    value={yeuCauDichVu.ngayYeuCau}
                    onChange={(e)=>{
                      handleInputChange(e)
                    }}
                    />
                    
                    </div>
                    <div className='col-6'>
                    <Form.Label htmlFor='thoiHan'>Thời gian thanh toán</Form.Label>
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
                    <Form.Label htmlFor='chuKy'>Chu kỳ thanh toán</Form.Label>
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
                {role==='khachhang'&&(
                  <div className='form-group mt-2 mb-2'>
                  <button type='submit' className='btn btn-hotel'>
                    Đăng ký dịch vụ
                  </button>
                </div>
                )}
                
                {isSubmitted&&(
                  <div className='form-group mt-2 mb-2'>
                    <button type='button' className='btn btn-primary'
                    onClick={()=>{
                      handleDangKy()
                    }}>
                      Xác nhận đăng ký
                    </button>
                  </div>
                )}
              </Form>
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
