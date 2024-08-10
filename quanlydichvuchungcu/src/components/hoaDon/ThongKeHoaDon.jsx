import React, { useEffect, useState } from 'react'
import {Col, Row} from 'react-bootstrap'
import {FaEdit, FaTrashAlt, FaEye} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import { getAllHoaDon, getHoaDon} from '../utils/ApiFunctions'
import {formatCurrency, formatTime} from '../utils/FormatValue'
import DataPaginator from '../common/DataPaginator'
import HoaDonFilter from '../common/HoaDonFilter'
import HoaDonTGFilter from '../common/HoaDonTGFilter'
import { exportExcel } from '../utils/Export'
const ThongKeHoaDon = () => {
    const[hoaDonList,setHoaDonList]=useState([])
    const[hoaDonFilterList,setHoaDonFilterList]=useState([])
    const[file,setFile]=useState('')
    const[currentPage,setCurrentPage]=useState(1)
    const[numPerPage]=useState(8)
    const[isLoading,setIsLoading] = useState(false)
    const[successMessage,setSuccessMessage]=useState("")
    const[errorMessage, setErrorMessage] = useState("")
    useEffect(()=>{
        fetchHoaDonList()
    },[])
    const fetchHoaDonList = async()=>{
        setIsLoading(true)
        try{
            const result = await getAllHoaDon()
            setHoaDonList(result)
            setHoaDonFilterList(result)
            setIsLoading(false)
        }catch(error){
            setErrorMessage(error.message)
            setIsLoading(false)
        }
        setTimeout(()=>{
          setErrorMessage("")
      },3000)
    }
    

    useEffect(()=>{
      setCurrentPage(1)
    },[hoaDonList])

    const submit = ()=>{
      const data = hoaDonFilterList.map(hoaDon =>{
        const partData = {}
        partData.soHoaDon = hoaDon.soHoaDon
        partData.khachHang = hoaDon.hopDong?
        hoaDon.hopDong.khachHang.maKhachHang:
        hoaDon.yeuCauDichVu.khachHang.maKhachHang
        partData.tongHoaDon = hoaDon.tongHoaDon
        partData.VND = formatCurrency(hoaDon.tongHoaDon,'vi-VN', 'VND')
        partData.thoiGianTao = formatTime(hoaDon.thoiGianTao)
        partData.thoiGianDong = formatTime(hoaDon.thoiGianDong)
        partData.trangThai = hoaDon.trangThai?('Đã thanh toán'):('Chưa thanh toán')
        partData.noiDung = hoaDon.hopDong?
        ('CanHo '+hoaDon.hopDong.canHo.soPhong+'-'+hoaDon.hopDong.canHo.tang + '-' + hoaDon.hopDong.canHo.lo):
        (hoaDon.yeuCauDichVu.dichVu.tenDichVu)
        return partData
      })
      exportExcel(data,file)
    }

    const handlePagninationClick=(pageNumber)=>{
      setCurrentPage(pageNumber)
    }
    const calculateTotalPages = (numPerPage, list)=>{
        const totalHoaDon = list.length
        return Math.ceil(totalHoaDon/numPerPage)
    }
    const indexOfLastHoaDon = currentPage * numPerPage
    const indexOfFirstHoaDon = indexOfLastHoaDon - numPerPage
    const currentHoaDonList = hoaDonFilterList.slice(indexOfFirstHoaDon,indexOfLastHoaDon)
    const tongDoanhThu = hoaDonFilterList.reduce((sum,hoaDon)=>{
      if(hoaDon.trangThai){
        return sum+hoaDon.tongHoaDon
      }
      return sum
    },0)
    const tongNo = hoaDonFilterList.reduce((sum,hoaDon)=>{
      if(!hoaDon.trangThai){
        return sum+hoaDon.tongHoaDon
      }
      return sum
    },0)
    return (
    <>
      {isLoading?(
        <p>Loading danh sách hóa đơn của chung cư</p>
      ):(
        <>
        
        <section className='mt-5 mb-5 container'>
            
            <div className='d-flex justify-content-center mb-3 mt-5'>
                <h2>Thống kê hóa đơn của chung cư</h2>
            </div>
            <HoaDonTGFilter data={hoaDonList} setFilteredData={setHoaDonFilterList}/>
            <br/>
            <Row>
              <Col md={6} className='mb-3 mb-md-0'>
              <div className='input-group mb-3'>
                <span className='input-group-text' id='exportFile'>Xuất file</span>
                <input
                className='form-control'
                value={file}
                onChange={(e)=>{
                  setFile(e.target.value)
                }}
                placeholder='Tên file'
                />
                <button className='btn btn-hotel' onClick={submit}>Xuất file excel</button>
                </div>
              </Col>
            </Row>
            <div className='row mb-3'>
            <div className='col-3'>Tổng doanh thu: {formatCurrency(tongDoanhThu,'vi-VN', 'VND')}</div>
            <div className='col-3'>Tổng nợ: {formatCurrency(tongNo,'vi-VN', 'VND')}</div>
            </div>
            
            {successMessage&&(
              <div className='alert alert-success fade show'>{successMessage}</div>
            )}
            {errorMessage&&(
              <div className='alert alert-danger fade show'>{errorMessage}</div>
            )}
            <table className='table table-bordered table-hover'>
              <thead>
                <tr className='text-center'>
                  <th>Số hóa đơn</th>
                  <th>Loại đóng</th>
                  <th>Nội dung</th>
                  <th>Mã khách hàng</th>
                  <th>Thời gian tạo</th>
                  <th>Thời gian đóng</th>
                  <th>Tổng số tiền</th>
                  <th>Thanh toán</th>
                </tr>
              </thead>
              <tbody>
                {(currentHoaDonList.length===0)?
                (
                  <tr>
                    <td colSpan="7" className='text-center'>Danh sách rỗng</td>
                  </tr>
                ):(currentHoaDonList.map((hoaDon)=>(
                  <tr key={hoaDon.idHoaDon} className='text-center'>
                    <td>{hoaDon.soHoaDon}</td>
                    <td>{(hoaDon.hopDong===null)?('Dịch vụ'):('Căn hộ')}</td>
                    <td>
                      {hoaDon.hopDong!==null&&(
                        'Số '+hoaDon.hopDong.canHo.soPhong + ' khu ' + hoaDon.hopDong.canHo.lo
                      )}
                      {hoaDon.yeuCauDichVu!==null&&(hoaDon.yeuCauDichVu.dichVu.tenDichVu)}
                    </td>
                    <td>
                      {hoaDon.hopDong!==null&&(
                        hoaDon.hopDong.khachHang.maKhachHang
                      )}
                      {hoaDon.yeuCauDichVu!==null&&(hoaDon.yeuCauDichVu.khachHang.maKhachHang)}
                    </td>
                    <td>{formatTime(hoaDon.thoiGianTao)}</td>
                    <td>{formatTime(hoaDon.thoiGianDong)}</td>
                    <td>{formatCurrency(hoaDon.tongHoaDon,'vi-VN', 'VND')}</td>
                    <td>
                    {hoaDon.trangThai?(
                      <>Đã thanh toán</>
                    ):(<text className='text-danger'>
                      Chưa thanh toán
                      </text>
                    )}
                    </td>
                  </tr>
                )))}
              </tbody>
            </table>
            <DataPaginator
            currentPage={currentPage}
            totalPages={calculateTotalPages(numPerPage, hoaDonFilterList)}
            onPageChange={handlePagninationClick}/>
        </section>
        </>
      )
      }
    </>
  )
}

export default ThongKeHoaDon
