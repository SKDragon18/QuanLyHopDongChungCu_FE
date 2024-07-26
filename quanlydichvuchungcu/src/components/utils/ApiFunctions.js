import axios from "axios"

export const api = axios.create({
    baseURL:"http://localhost:8080"
})

export const getHeader = () =>{
    const token = localStorage.getItem("token")
    return {
        Authorization: `Bearer ${token}`,
        "Content-Type" : "application/json"
    }
}

//Quản lý
//Loại phòng
export async function getLoaiPhong(){
    try{
        const response  = await api.get("/canho/loaiphong",{
            headers:getHeader()
        })
        const data = response.data
        if(data.code ===200){
            return data.result
        }
        else{
            throw new Error(data.message)
        }
    }catch(error){
        throw new Error(error.message)
    }
}

export async function insertLoaiPhong(loaiPhong){
    
    try{
        const response = await api.post("/canho/loaiphong",loaiPhong, {
            headers:getHeader()
        })
        const data = response.data
        if(data.code ===200){
            return data.result
        }
        else{
            throw new Error(data.message)
        }
    }
    catch(error){
        throw new Error(error.message)
    }
        
}

//Điều khoản
export async function getDieuKhoan(){
    try{
        const response  = await api.get("/dieukhoan",{
            headers:getHeader()
        })
        const data = response.data
        if(data.code ===200){
            return data.result
        }
        else{
            throw new Error(data.message)
        }
    }catch(error){
        throw new Error(error.message)
    }
}

//Căn hộ
export async function getCanHo(){
    try{
        const response  = await api.get("/canho", {
            headers:getHeader()
        })
        const data = response.data
        if(data.code ===200){
            return data.result
        }
        else{
            throw new Error(data.message)
        }
    }catch(error){
        throw new Error(error.message)
    }
}

export async function getCanHoById(idCanHo){
    try{
        const response  = await api.get(`/canho/${idCanHo}`,{
            headers:getHeader()
        })
        const data = response.data
        if(data.code ===200){
            return data.result
        }
        else{
            throw new Error(data.message)
        }
    }catch(error){
        throw new Error(error.message)
    }
}

export async function insertCanHo(canHo){
    try{
        const response = await api.post("/canho",canHo,{
            headers:getHeader()
        })
        const data = response.data
        if(data.code ===200){
            return data.result
        }
        else{
            throw new Error(data.message)
        }
    }
    catch(error){
        throw new Error(error.message)
    }
}

export async function updateCanHo(canHo){
    try{
        const response = await api.put("/canho",canHo,{
            headers:getHeader()
        })
        const data = response.data
        if(data.code===200){
            return data.result
        }
        else{
            throw new Error(data.message)
        }
    }
    catch(error){
        throw new Error(error.message)
    }
}

export async function updateTrangThaiCanHo(idCanHo){
    try{
        const response = await api.put(`/canho/${idCanHo}`,
        {},{
            headers:getHeader()
        })
        const data = response.data
        if(data.code===200){
            return data.result
        }
        else{
            throw new Error(data.message)
        }
    }
    catch(error){
        throw new Error(error.message)
    }
}

export async function deleteCanHo(idCanHo){
    try{
        const response = await api.delete(`/canho/${idCanHo}`,
        {
            headers:getHeader()
        })
        const data = response.data
        if(data.code===200){
            return data.result
        }
        else{
            throw new Error(data.message)
        }
    }
    catch(error){
        throw new Error(error.message)
    }
}

export async function saveHinhAnh(image, idCanHo){
    try{
        const formData  = new FormData()
        formData.append("images", image)
        formData.append("idCanHo", idCanHo)
        const response  = await api.post("/canho/hinhanh",formData,{
            headers:getHeader()
        })
        const data = response.data
        console.log(data)
        if(data.code===200){
            return "Thành công"
        }
        else{
            return "Thất bại"
        }
        
    }catch(error){
        throw new Error(error.message)
    }
}

export async function doiHinhAnh(image, idCanHo){
    try{
        const formData  = new FormData()
        formData.append("images", image)
        formData.append("idCanHo", idCanHo)
        const response  = await api.post("/canho/doihinhanh",formData,{
            headers:getHeader()
        })
        const data = response.data
        if(data.code===200){
            return "Thành công"
        }
        else{
            return "Thất bại"
        }
    }catch(error){
        throw new Error(error.message)
    }
}



//Dịch vụ
export async function getDichVu(){
    try{
        const response  = await api.get("/dichvu",{
            headers:getHeader()
        })
        const data = response.data
        if(data.code===200){
            return data.result
        }
        else{
            throw new Error(data.message)
        }
    }catch(error){
        throw new Error(error.message)
    }
}

export async function getDichVuById(idDichVu){
    try{
        const response  = await api.get(`/dichvu/${idDichVu}`,
            {
                headers:getHeader()
            }
        )
        const data = response.data
        if(data.code===200){
            return data.result
        }
        else{
            throw new Error(data.message)
        }
    }catch(error){
        throw new Error(error.message)
    }
}

export async function insertDichVu(dichvu){
    try{
        const response = await api.post("/dichvu",dichvu,{
            headers:getHeader()
        })
        const data = response.data
        if(data.code===200){
            return data.result
        }
        else{
            throw new Error(data.message)
        }
    }
    catch(error){
        throw new Error(error.message)
    }
}

export async function updateDichVu(dichvu){
    try{
        const response = await api.put("/dichvu",dichvu,{
            headers:getHeader()
        })
        const data = response.data
        if(data.code===200){
            return data.result
        }
        else{
            throw new Error(data.message)
        }
    }
    catch(error){
        throw new Error(error.message)
    }
}

export async function updateTrangThaiDichVu(dichvu){
    try{
        const response = await api.put(`/dichvu/${dichvu}`,
        {},    {
            headers:getHeader()
        })
        const data = response.data
        if(data.code===200){
            return data.result
        }
        else{
            throw new Error(data.message)
        }
    }
    catch(error){
        throw new Error(error.message)
    }
}

export async function deleteDichVu(idDichVu){
    try{
        const response = await api.delete(`/dichvu/${idDichVu}`,
        {
            headers:getHeader()
        })
        const data = response.data
        if(data.code===200){
            return data.result
        }
        else{
            throw new Error(data.message)
        }
    }
    catch(error){
        throw new Error(error.message)
    }
}

//Quản lý giá
export async function getBangGia(){
    try{
        const response  = await api.get("/banggia",{
            headers:getHeader()
        })
        const data = response.data
        if(data.code===200){
            return data.result
        }
        else{
            throw new Error(data.message)
        }
    }catch(error){
        throw new Error(error.message)
    }
}

export async function getBangGiaById(idBangGia){
    try{
        const response  = await api.get(`/banggia/${idBangGia}`,{
            headers:getHeader()
        })
        const data = response.data
        if(data.code===200){
            return data.result
        }
        else{
            throw new Error(data.message)
        }
    }catch(error){
        throw new Error(error.message)
    }
}

export async function insertBangGia(banggia){
    
    try{
        const response = await api.post("/banggia",banggia,{
            headers:getHeader()
        })
        const data = response.data
        if(data.code===200){
            return data.result
        }
        else{
            throw new Error(data.message)
        }
    }catch(error){
        throw new Error(error.message)
    }
}

export async function updateBangGia(banggia){
    
    try{
        const response = await api.put("/banggia",banggia,{
            headers:getHeader()
        })
        const data = response.data
        if(data.code===200){
            return data.result
        }
        else{
            throw new Error(data.message)
        }
    }catch(error){
        throw new Error(error.message)
    }
}

export async function updateTrangThaiBangGia(idBangGia){
    try{
        console.log(getHeader())
        const response = await api.put(`/banggia/${idBangGia}`,
        {},  {
            headers:getHeader()
        })
        
        const data = response.data
        console.log(data)
        if(data.code===200){
            return data.result
        }
        else{
            throw new Error(data.message)
        }
    }catch(error){
        throw new Error(error.message)
    }
}

export async function uploadGiaCanHo(idBangGia){
    try{
        const response = await api.put(`/banggia/uploadcanho/${idBangGia}`,
            {},
            {
                headers:getHeader()
            }
        )
        const data = response.data
        if(data.code===200){
            return data.result
        }
        else{
            throw new Error(data.message)
        }
    }catch(error){
        throw new Error(error.message)
    }
}

export async function uploadGiaDichVu(idBangGia){
    try{
        const response = await api.put(`/banggia/uploaddichvu/${idBangGia}`,
            {},
            {
                headers:getHeader()
            }
        )
        const data = response.data
        if(data.code===200){
            return data.result
        }
        else{
            throw new Error(data.message)
        }
    }catch(error){
        throw new Error(error.message)
    }
}


export async function deleteBangGia(idBangGia){
    try{
        const response = await api.delete(`/banggia/${idBangGia}`,
            {
                headers:getHeader()
            }
        )
        const data = response.data
        if(data.code===200){
            return data.result
        }
        else{
            throw new Error(data.message)
        }
    }catch(error){
        throw new Error(error.message)
    }
}


//Khách hàng
export async function getKhachHangById(idKhachHang){
    try{
        const response  = await api.get(`/nguoidung/khachhang/${idKhachHang}`)
        const data = response.data
        if(data.code===200){
            return data.result
        }
        else{
            throw new Error(data.message)
        }
    }catch(error){
        throw new Error(error.message)
    }
}

export async function getCanHoChoThue(){
    try{
        const response  = await api.get("/hienthi/canhochothue")
        const data = response.data
        if(data.code===200){
            return data.result
        }
        else{
            throw new Error(data.message)
        }
    }catch(error){
        throw new Error(error.message)
    }
}

export async function getDichVuChoDangKy(){
    try{
        const response  = await api.get("/hienthi/dichvu")
        const data = response.data
        if(data.code===200){
            return data.result
        }
        else{
            throw new Error(data.message)
        }
    }catch(error){
        throw new Error(error.message)
    }
}

export async function getCanHoChoThueById(idCanHo){
    try{
        const response  = await api.get(`/hienthi/canhochothue/${idCanHo}`)
        const data = response.data
        if(data.code===200){
            return data.result
        }
        else{
            throw new Error(data.message)
        }
    }catch(error){
        throw new Error(error.message)
    }
}

export async function getDichVuChoDangKyById(idDichVu){
    try{
        const response  = await api.get(`/hienthi/dichvu/${idDichVu}`)
        const data = response.data
        if(data.code===200){
            return data.result
        }
        else{
            throw new Error(data.message)
        }
    }catch(error){
        throw new Error(error.message)
    }
}

export async function dangKyHopDong(hopdong){
    try{
        const response = await api.post("/hopdong",hopdong)
        const data = response.data
        if(data.code===200){
            return data.result
        }
        else{
            throw new Error(data.message)
        }
    }catch(error){
        throw new Error(error.message)
    }
}

export async function dangKyDichVu(yeuCauDichVu){
    try{
        const response = await api.post("/hopdong/dichvu",yeuCauDichVu)
        const data = response.data
        if(data.code===200){
            return data.result
        }
        else{
            throw new Error(data.message)
        }
    }catch(error){
        throw new Error(error.message)
    }
}

export async function checkHopDongDichVu(yeuCauDichVu){
    try{
        const response = await api.post("/hopdong/dichvu/checkyeucau",yeuCauDichVu)
        const data = response.data
        if(data.code===200){
            return data.result
        }
        else{
            throw new Error(data.message)
        }
    }catch(error){
        throw new Error(error.message)
    }
}

export async function giaHanHopDong(idHopDong,soHoaDon){
    try{
        const response = await api.put(`/hopdong/giahan/${idHopDong}/${soHoaDon}`)
        const data = response.data
        if(data.code===200){
            return data.result
        }
        else{
            throw new Error(data.message)
        }
    }catch(error){
        throw new Error(error.message)
    }
}

export async function giaHanHopDongDichVu(idYeuCauDichVu,soHoaDon){
    try{
        const response = await api.put(`/hopdong/dichvu/giahan/${idYeuCauDichVu}/${soHoaDon}`)
        const data = response.data
        if(data.code===200){
            return data.result
        }
        else{
            throw new Error(data.message)
        }
    }catch(error){
        throw new Error(error.message)
    }
}

export async function huyHopDong(idHopDong){
    try{
        const response = await api.put(`/hopdong/huy/${idHopDong}`)
        const data = response.data
        if(data.code===200){
            return data.result
        }
        else{
            throw new Error(data.message)
        }
    }catch(error){
        throw new Error(error.message)
    }
}

export async function huyHopDongDichVu(idYeuCauDichVu){
    try{
        const response = await api.put(`/hopdong/dichvu/huy/${idYeuCauDichVu}`)
        const data = response.data
        if(data.code===200){
            return data.result
        }
        else{
            throw new Error(data.message)
        }
    }catch(error){
        throw new Error(error.message)
    }
}
export async function getAllHoaDon(){
    try{
        const response  = await api.get(`/hoadon`,{headers:getHeader()})
        const data = response.data
        if(data.code===200){
            return data.result
        }
        else{
            throw new Error(data.message)
        }
    }catch(error){
        throw new Error(error.message)
    }
}
export async function getHoaDon(maKhachHang){
    try{
        const response  = await api.get(`/hoadon/khachhang/${maKhachHang}`,{
            headers:getHeader()
        })
        const data = response.data
        if(data.code===200){
            return data.result
        }
        else{
            throw new Error(data.message)
        }
    }catch(error){
        throw new Error(error.message)
    }
}

export async function getAllHopDong(){
    try{
        const response  = await api.get('/hopdong')
        const data = response.data
        if(data.code===200){
            return data.result
        }
        else{
            throw new Error(data.message)
        }
    }catch(error){
        throw new Error(error.message)
    }
}

export async function getAllHopDongKhachHang(maKhachHang){
    try{
        const response  = await api.get(`/hopdong/khachhangall/${maKhachHang}`)
        const data = response.data
        if(data.code===200){
            return data.result
        }
        else{
            throw new Error(data.message)
        }
    }catch(error){
        throw new Error(error.message)
    }
}

export async function getHopDongKhachHang(idHopDong){
    try{
        const response  = await api.get(`/hopdong/khachhang/${idHopDong}`)
        const data = response.data
        if(data.code===200){
            return data.result
        }
        else{
            throw new Error(data.message)
        }
    }catch(error){
        throw new Error(error.message)
    }
}

export async function getAllHopDongDichVu(){
    try{
        const response  = await api.get('/hopdong/dichvu')
        const data = response.data
        if(data.code===200){
            return data.result
        }
        else{
            throw new Error(data.message)
        }
    }catch(error){
        throw new Error(error.message)
    }
}

export async function getAllHopDongDichVuKhachHang(maKhachHang){
    try{
        const response  = await api.get(`/hopdong/dichvu/khachhangall/${maKhachHang}`)
        const data = response.data
        if(data.code===200){
            return data.result
        }
        else{
            throw new Error(data.message)
        }
    }catch(error){
        throw new Error(error.message)
    }
}

export async function getHopDongDichVuKhachHang(idYeuCauDichVu){
    try{
        const response  = await api.get(`/hopdong/dichvu/khachhang/${idYeuCauDichVu}`)
        const data = response.data
        if(data.code===200){
            return data.result
        }
        else{
            throw new Error(data.message)
        }
    }catch(error){
        throw new Error(error.message)
    }
}

export async function loginUser(login){
    try{
        const response = await api.post('/nguoidung/dangnhap', login)
        return response.data
    }
    catch(error){
        console.error(error)
        throw new Error(error.message)
    }
}

export async function registerUser(taikhoan){
    try{
        const response = await api.post('/nguoidung/dangky', taikhoan)
        const data = response.data
        if(data.code===200){
            return data.result
        }
        else{
            throw new Error(data.message)
        }
    }catch(error){
        throw new Error(error.message)
    }
}

export async function getCode(tenDangNhap){
    try{
        const response = await api.get(`/nguoidung/maxacnhan/${tenDangNhap}`)
        const data = response.data
        if(data.code===200){
            return data.result
        }
        else{
            throw new Error(data.message)
        }
    }catch(error){
        throw new Error(error.message)
    }
}

export async function recoverPassword(doiMatKhau){
    try{
        const response = await api.put('/nguoidung/quenmatkhau', doiMatKhau)
        const data = response.data
        if(data.code===200){
            return data.result
        }
        else{
            throw new Error(data.message)
        }
    }catch(error){
        throw new Error(error.message)
    }
}

//Admin

export async function getTaiKhoanList(taikhoan){
    try{
        const response = await api.get('/taikhoan', {
            headers:getHeader()
        })
        const data = response.data
        if(data.code===200){
            return data.result
        }
        else{
            throw new Error(data.message)
        }
    }catch(error){
        throw new Error(error.message)
    }
}

export async function insertTaiKhoan(taikhoan){
    try{
        const response = await api.post('/taikhoan',taikhoan, {
            headers:getHeader()
        })
        const data = response.data
        if(data.code===200){
            return data.result
        }
        else{
            throw new Error(data.message)
        }
    }catch(error){
        throw new Error(error.message)
    }
}

export async function updateTrangThaiTaiKhoan(tenDangNhap){
    try{
        const response = await api.put(`/taikhoan/updatekhoa/${tenDangNhap}`,
        {},{
            headers:getHeader()
        })
        const data = response.data
        if(data.code===200){
            return data.result
        }
        else{
            throw new Error(data.message)
        }
    }
    catch(error){
        throw new Error(error.message)
    }
}

export async function updateQuyenTaiKhoan(tenDangNhap){
    try{
        const response = await api.put(`/taikhoan/updatequyen/${tenDangNhap}`,
        {},{
            headers:getHeader()
        })
        const data = response.data
        if(data.code===200){
            return data.result
        }
        else{
            throw new Error(data.message)
        }
    }
    catch(error){
        throw new Error(error.message)
    }
}

export async function resetTaiKhoan(tenDangNhap){
    try{
        const response = await api.put(`/taikhoan/reset/${tenDangNhap}`,
        {},{
            headers:getHeader()
        })
        const data = response.data
        if(data.code===200){
            return data.result
        }
        else{
            throw new Error(data.message)
        }
    }
    catch(error){
        throw new Error(error.message)
    }
}

//Thanh toán
export async function createPayment(amount){
    try{
        const response = await api.post('/hoadon/create-payment',amount, {
            headers:getHeader()
        })
        const data = response.data
        if(data.code===200){
            return data.result
        }
        else{
            throw new Error(data.message)
        }
    }catch(error){
        throw new Error(error.message)
    }
}

export async function checkPayment(id){
    try{
        const response = await api.get(`/hoadon/check-payment/${id}`,{
            headers:getHeader()
        })
        const data = response.data
        if(data.code===200){
            return data.result
        }
        else{
            throw new Error(data.message)
        }
    }catch(error){
        throw new Error(error.message)
    }
}


//Quyền
export async function insertQuyen(quyen){
    try{
        const response = await api.post('/taikhoan/quyen',quyen, {
            headers:getHeader()
        })
        const data = response.data
        if(data.code===200){
            return data.result
        }
        else{
            throw new Error(data.message)
        }
    }catch(error){
        throw new Error(error.message)
    }
}

export async function getQuyen(){
    try{
        const response = await api.get('/taikhoan/quyen', {
            headers:getHeader()
        })
        const data = response.data
        if(data.code===200){
            return data.result
        }
        else{
            throw new Error(data.message)
        }
    }catch(error){
        throw new Error(error.message)
    }
}

export async function getBanQuanLyById(ma){
    try{
        const response  = await api.get(`/taikhoan/banquanly/${ma}`,{
            headers:getHeader()
        })
        const data = response.data
        if(data.code===200){
            return data.result
        }
        else{
            throw new Error(data.message)
        }
    }catch(error){
        throw new Error(error.message)
    }
}

export async function updateBanQuanLy(banquanly){
    try{
        const response  = await api.put('/taikhoan/banquanly',banquanly,{
            headers:getHeader()
        })
        const data = response.data
        if(data.code===200){
            return data.result
        }
        else{
            throw new Error(data.message)
        }
    }catch(error){
        throw new Error(error.message)
    }
}