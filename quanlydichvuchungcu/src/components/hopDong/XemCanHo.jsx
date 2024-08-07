import React, { useState, useEffect } from 'react'
import {checkPayment, createPayment, getHopDongKhachHang, giaHanHopDong} from '../utils/ApiFunctions'
import { useParams } from 'react-router-dom'
import { Form, FormControl } from 'react-bootstrap'
import apartment from '../../assets/images/apartment.png'
import {formatCurrency, formatTime} from '../utils/FormatValue'
const XemCanHo = () => {
    const[errorMessage,setErrorMessage]=useState('')
    const[successMessage,setSuccessMessage]=useState('')
    const[isSubmitted, setIsSubmitted]=useState(false)
    const {idHopDong} = useParams()
    const[hopDong, setHopDong] = useState({
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
    const fetchHopDongById= async()=>{
      try{
        console.log(idHopDong)
          const result = await getHopDongKhachHang(parseFloat(idHopDong))
          console.log(result)
          setHopDong(result)
          setCanHo(result.canHo)
          setKhachHang(result.khachHang)
          setDieuKhoanCanHoList(result.dieuKhoanList)
      }
      catch(error){
          setErrorMessage(error.message)
      }
  }
  
  useEffect(()=>{
    fetchHopDongById()
  },[])

  const handleSubmit=(e)=>{
    e.preventDefault()
    setIsSubmitted(true)
  }
  const handleGiaHan = async (e)=>{
    e.preventDefault()
    console.log(hopDong)
    try{
      const success = await giaHanHopDong(idHopDong)
      setSuccessMessage(success)
      setTimeout(()=>{
        setSuccessMessage("")
      },3000)
    }
    catch(error){
      setErrorMessage(error.message)
      setTimeout(()=>{
        setErrorMessage("")
      },3000)
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
                      {(Array.isArray(canHo.hinhAnhList)&&canHo.hinhAnhList.length>0)?
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

              <Form onSubmit={handleSubmit}>
                <fieldset style={{border:'2px'}}>
                  <legend>Thông tin hợp đồng</legend>
                  <div className='row'>
                    <div className='col-6'>
                    <Form.Label htmlFor='ngayBatDau'>Bắt đầu</Form.Label>
                    <FormControl
                    readOnly
                    id='ngayBatDau'
                    name='ngayBatDau'
                    value={formatTime(hopDong.ngayBatDau)}
                    />
                    </div>
                    <div className='col-6'>
                    <Form.Label htmlFor='thoiHan'>Kết thúc</Form.Label>
                    <FormControl
                    readOnly
                    id='thoiHan'
                    name='thoiHan'
                    value={formatTime(hopDong.thoiHan)}
                    />
                    </div>
                  </div>
                  <div className='row mb-3'>
                    <div className='col-6'>
                    <Form.Label htmlFor='ngayLap'>Ngày lập</Form.Label>
                    <FormControl
                    readOnly
                    id='ngayLap'
                    name='ngayLap'
                    value={formatTime(hopDong.ngayLap)}
                    />
                    </div>
                    <div className='col-6'>
                    <Form.Label htmlFor='chuKy'>Thời hạn hợp đồng</Form.Label>
                    <FormControl
                    readOnly
                    id='chuKy'
                    name='chuKy'
                    value={String(hopDong.chuKy) +' ngày'}
                    />
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-6'>
                    
                    </div>
                    <div className='col-6'>
                    <Form.Label htmlFor='thoiGianDong'>Thời gian thanh toán tiếp theo</Form.Label>
                    <FormControl
                    readOnly
                    id='thoiGianDong'
                    name='thoiGianDong'
                    value={formatTime(hopDong.thoiGianDong)}
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
                    value={formatCurrency(hopDong.giaTri,'vi-VN', 'VND')}
                    />
                    </div>
                    <div className='col-6'>
                    <Form.Label htmlFor='chuKyDong'>Chu kỳ thanh toán</Form.Label>
                    <FormControl
                    readOnly
                    id='chuKyDong'
                    name='chuKyDong'
                    value={hopDong.chuKyDong + ' ngày'}
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
                {hopDong.giaHan&&(
                  <div className='form-group mt-2 mb-2'>
                    <button type='submit' className='btn btn-danger'>
                      Gia hạn hợp đồng
                    </button>
                    
                  </div>
                )}
                {isSubmitted&&(
                  <div className='form-group mt-2 mb-2'>
                      <button type='button' className='btn btn-primary' onClick={handleGiaHan}>
                        Xác nhận gia hạn
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

export default XemCanHo
