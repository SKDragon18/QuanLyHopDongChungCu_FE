import React, { useState, useEffect } from 'react'
import {dangKyDichVu, getDichVuChoDangKyById, getKhachHangById, getAllHopDongKhachHang} from '../utils/ApiFunctions'
import { useParams } from 'react-router-dom'
import { Form, FormControl } from 'react-bootstrap'
const DangKyDichVu = () => {
    // const[isValidated, setIsValidated]= useState(false)
    const[isSubmitted, setIsSubmitted] = useState(false)
    const[errorMessage,setErrorMessage]=useState('')
    const[successMessage,setSuccessMessage]=useState('')
    const {idDichVu} = useParams()
    const [ma] = useState('trangialong')
    const formatCurrency = (value, locale = 'en-US', currency = 'USD') => {
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
      }).format(value);
    };
    const[yeuCauDichVu, setYeuCauDichVu] = useState({
      idYeuCauDichVu:0,
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
          if(result.status===200){
              setDichVu(result.data)
          }
          else{
              setErrorMessage("Lấy dịch vụ thất bại")
          }
      }
      catch(error){
          setErrorMessage(error.message)
      }
  }
  const fetchKhachHangById= async()=>{
    try{
        const result = await getKhachHangById(ma)
        if(result.status===200){
            setKhachHang(result.data)
        }
        else{
            setErrorMessage("Lấy thông tin khách hàng thất bại")
        }
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
    const handleSubmit=()=>{
      try{
        setIsSubmitted(true)
        // navigate("/",{state:{message:""}})
      }
      catch(error){
        setErrorMessage(error.message)
      }
    }
    const handlePay = async (e)=>{
      if(yeuCauDichVu.hopDong.idHopDong===0){
        return;
      }
      e.preventDefault()
      console.log(yeuCauDichVu)
      try{
        const success = await dangKyDichVu(yeuCauDichVu)
        if(success.status===200){
          setSuccessMessage("Đăng ký thành công")
        }
        else{
          setErrorMessage("Đăng ký thất bại")
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
                              return(
                          <option key={key} value={val.idHopDong}>
                              {'Căn hộ '+val.canHo.soPhong + ' tầng '+val.canHo.tang+' khu '+val.canHo.lo}
                          </option>
                          )})}
                          
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
                    Xác nhận thuê
                  </button>
                </div>
                {isSubmitted&&(
                  <div className='form-group mt-2 mb-2'>
                    {successMessage&&(
                        <div className='alert alert-success fade show'>{successMessage}</div>
                        )}
                        {errorMessage&&(
                            <div className='alert alert-danger fade show'>{errorMessage}</div>
                        )}
                    <button type='submit' className='btn btn-hotel'
                    >
                      Xác nhận thanh toán
                    </button>
                  </div>
                )}
              </Form>
              
                
                
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DangKyDichVu