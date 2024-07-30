import React, { useState, useEffect } from 'react'
import {checkPayment, createPayment, dangKyHopDong, getCanHoChoThueById, getKhachHangById} from '../utils/ApiFunctions'
import { useParams } from 'react-router-dom'
import { Form, FormControl } from 'react-bootstrap'
import apartment from '../../assets/images/apartment.png'
const ThueCanHo = () => {
    // const[isValidated, setIsValidated]= useState(false)
    const[isSubmitted, setIsSubmitted] = useState(false)
    const[errorMessage,setErrorMessage]=useState('')
    const[successMessage,setSuccessMessage]=useState('')
    const {idCanHo} = useParams()
    const [urlPay,setUrlPay] = useState('');
    const [username] = useState(localStorage.getItem("tenDangNhap"))
    const [role] = useState(localStorage.getItem("role"))
    const formatCurrency = (value, locale = 'en-US', currency = 'USD') => {
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
      }).format(value);
    };
    const[hopDong, setHopDong] = useState({
        idHopDong:0,
        ngayLap: '',
        khachHang:{},
        canHo:{idCanHo:0,
          soPhong:'0',
          tang:0,
          lo:'A',
          loaiPhong:{
            tenLoaiPhong:''
          },
          dienTich:0,
          tienNghi:'',
          moTa:'',
          giaThue:0,
          chuKy:30,
          giaKhuyenMai:0,
          dieuKhoanList:[],
          hinhAnhList:[]},
        giaTri:0,
        ngayBatDau:'',
        thoiHan:'',
        chuKy:30,
        trangThai:''
    })
    const [canHo,setCanHo]=useState({
        idCanHo:0,
        soPhong:'0',
        tang:0,
        lo:'A',
        loaiPhong:{
          tenLoaiPhong:''
        },
        dienTich:0,
        tienNghi:'',
        moTa:'',
        giaThue:0,
        chuKy:30,
        giaKhuyenMai:0,
        dieuKhoanList:[],
        hinhAnhList:[]
    })
    const [khachHang,setKhachHang]=useState({
      maKhachHang:'',
      ho:'',
      ten:'',
      sdt:'',
      email:'',
      cmnd:''
  })
    const[dieuKhoanCanHoList,setDieuKhoanCanHoList] = useState([{

    }])
    const fetchCanHoById= async()=>{
      try{
          const result = await getCanHoChoThueById(idCanHo)
          setCanHo(result)
      }
      catch(error){
          setErrorMessage(error.message)
      }
  }
  const fetchKhachHangById= async()=>{
    try{
        const result = await getKhachHangById(username)
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
    fetchCanHoById()
    fetchKhachHangById()
  },[])

  const [today] = useState(new Date());
  const [todayString] = useState(today.toISOString().slice(0, 16));
  const [day7after] = useState(new Date());

  day7after.setDate(today.getDate()+7);
  const [day7afterString] = useState(day7after.toISOString().slice(0, 16));
  useEffect(()=>{
    const giaTri = (canHo.giaKhuyenMai===null)?canHo.giaThue:canHo.giaKhuyenMai
    setHopDong(hopDong=>({...hopDong,['canHo']:canHo,['giaTri']:giaTri}))
    setDieuKhoanCanHoList(canHo.dieuKhoanList)
    console.log("CanHo")
    console.log(canHo)
  },[canHo])
  useEffect(()=>{
    setHopDong({...hopDong, ['khachHang']:khachHang})
  },[khachHang])
  useEffect(()=>{
    if(hopDong.ngayBatDau!==''){
      const thoiHan = new Date(hopDong.ngayBatDau);
      thoiHan.setDate(thoiHan.getDate()+canHo.chuKy);
      setHopDong({...hopDong,['thoiHan']:thoiHan.toISOString().slice(0, 16), ['ngayLap']:todayString})
    }
    
  },[hopDong.ngayBatDau])

  const handleInputChange=(e)=>{
      const{name,value} = e.target

      setHopDong({...hopDong,[name]:value})
      setErrorMessage("")
  }
  const handleSubmit=()=>{
    try{
      setIsSubmitted(true)
    }
    catch(error){
      setErrorMessage(error.message)
    }
  }
  const handlePay = async (e)=>{
    e.preventDefault()
    console.log(hopDong)
    try{
      const success = await dangKyHopDong(hopDong)
      setUrlPay(success.url)
    }
    catch(error){
      setErrorMessage(error.message)
    }
    setTimeout(()=>{
      setErrorMessage("")
    },3000)
  }

  const changePage = ()=>{
    if(urlPay!=''){
      window.location.href=urlPay
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
                </fieldset>
                <fieldset style={{border:'2px'}}>
                  <legend className='mt-3'>Thông tin căn hộ</legend>
                  <Form.Group>
                    <div className='row'>
                      <div className='col-2'>
                      <Form.Label htmlFor='idCanHo'>ID</Form.Label>
                      <FormControl
                      readOnly
                      id='idCanHo'
                      name='idCanHo'
                      value={canHo.idCanHo}
                      />
                      </div>
                      <div className='col-8'>
                      <Form.Label htmlFor='thoiHan'>Địa chỉ</Form.Label>
                      <FormControl
                      readOnly
                      value={'Căn hộ '+canHo.soPhong + ' tầng '+ canHo.tang+' khu '+canHo.lo}
                      />
                      </div>
                    </div>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label htmlFor='tenLoaiPhong'>Loại phòng: </Form.Label>
                    <FormControl
                    readOnly
                    type='text'
                    id='tenLoaiPhong'
                    name='tenLoaiPhong'
                    value={canHo.loaiPhong.tenLoaiPhong}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label htmlFor='dienTich'>Diện tích: </Form.Label>
                    <FormControl
                    readOnly
                    id='dienTich'
                    name='dienTich'
                    value={canHo.dienTich + 'm2'}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label htmlFor='tienNghi'>Tiện nghi: </Form.Label>
                    <FormControl
                    readOnly
                    type='text'
                    id='tienNghi'
                    name='tienNghi'
                    value={canHo.tienNghi}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label htmlFor='moTa'>Mô tả: </Form.Label>
                    <FormControl
                    readOnly
                    type='text'
                    id='moTa'
                    name='moTa'
                    value={canHo.moTa}
                    />
                  </Form.Group>
                  <Form.Group>
                      {(canHo.hinhAnhList.length>0)?
                      (<div className='flex-shrink-0 mr-3 mb-3 md-md-0'>
                          <img
                          src={`data:image/png;base64, ${canHo.hinhAnhList[0]}`}
                          alt='Hình căn hộ'
                          style={{maxWidth:"400px", maxHeight:"400px"}}
                                className='mb-3 mt-3'/>
                        </div>)
                        :(<div className='flex-shrink-0 mr-3 mb-3 md-md-0'>
                          <img
                          src={apartment}
                          alt='Hình căn hộ'
                          style={{maxWidth:"400px", maxHeight:"400px"}}
                                className='mb-3 mt-3'/>
                      </div>)}
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
              <h4 className='card card-title text-center'>Hợp đồng thuê căn hộ</h4>

              <Form onSubmit={handlePay}>
                <fieldset style={{border:'2px'}}>
                  <legend>Thông tin hợp đồng</legend>
                  <div className='row'>
                    <div className='col-6'>
                    <Form.Label htmlFor='ngayBatDau'>Bắt đầu</Form.Label>
                    <FormControl
                    required
                    type='datetime-local'
                    id='ngayBatDau'
                    name='ngayBatDau'
                    min={todayString}
                    max={day7afterString}
                    value={hopDong.ngayBatDau}
                    onChange={(e)=>{
                      handleInputChange(e)
                    }}
                    />
                    </div>
                    <div className='col-6'>
                    <Form.Label htmlFor='thoiHan'>Kết thúc</Form.Label>
                    <FormControl
                    readOnly
                    type='datetime-local'
                    id='thoiHan'
                    name='thoiHan'
                    value={hopDong.thoiHan}
                    />
                    </div>
                  </div>
                </fieldset>
                <fieldset style={{border:'2px'}}>
                  <div className='row'>
                    <div className='col-6'>
                    <Form.Label htmlFor='giaThue'>Giá thuê</Form.Label>
                    <FormControl
                    readOnly
                    id='giaThue'
                    name='giaThue'
                    value={(canHo.giaKhuyenMai!==null?formatCurrency(canHo.giaKhuyenMai,'vi-VN', 'VND')
                      :formatCurrency(canHo.giaThue,'vi-VN', 'VND'))}
                    />
                    </div>
                    <div className='col-6'>
                    <Form.Label htmlFor='chuKy'>Chu kỳ</Form.Label>
                    <FormControl
                    readOnly
                    id='chuKy'
                    name='chuKy'
                    value={canHo.chuKy + ' ngày'}
                    />
                    </div>
                  </div>
                </fieldset>
                <fieldset style={{border:'2px'}}>
                  <legend>Điều khoản hợp đồng</legend>
                  <table className='table table-bordered table-hover'>
                      
                      <tbody>
                        {(!Array.isArray(dieuKhoanCanHoList)||dieuKhoanCanHoList.length===0)?
                        (
                          <tr>
                            <td colSpan="7" className='text-center'>Không có yêu cầu điều khoản</td>
                          </tr>
                        ):(dieuKhoanCanHoList.map((dieuKhoan)=>(
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
                  <button type='button' className='btn btn-hotel'
                  onClick={()=>{
                    handleSubmit()
                  }}>
                    Xác nhận thuê
                  </button>
                  </div>
                )}
                
                {isSubmitted&&(
                  <div className='form-group mt-2 mb-2'>
                    
                    <button type='submit' className='btn btn-hotel'>
                      Xác nhận thanh toán bằng VNPay
                    </button>
                    
                  </div>
                  
                )}
                
              </Form>
              {urlPay!==''&&(
              <button type='button' className='btn btn-primary mb-3 mt-3' onClick={changePage}>
              Đến trang VNPay
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

export default ThueCanHo
