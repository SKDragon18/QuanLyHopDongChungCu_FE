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

//Loại phòng
export async function getLoaiPhong(){
    try{
        const response  = await api.get("/canho/loaiphong")
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
        const response = await api.post("/canho/loaiphong",loaiPhong)
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
        const response  = await api.get("/dieukhoan")
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
        const response  = await api.get("/canho")
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
        const response  = await api.get(`/canho/${idCanHo}`)
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
        const response = await api.post("/canho",canHo)
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
        const response = await api.put("/canho",canHo)
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
        const response = await api.put(`/canho/${idCanHo}`)
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
        const response = await api.delete(`/canho/${idCanHo}`)
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
        const response  = await api.post("/canho/hinhanh",formData)
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
        const response  = await api.post("/canho/doihinhanh",formData)
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
        const response  = await api.get("/dichvu")
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
        const response  = await api.get(`/dichvu/${idDichVu}`)
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
        const response = await api.post("/dichvu",dichvu)
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
        const response = await api.put("/dichvu",dichvu)
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
        const response = await api.put(`/dichvu/${dichvu}`)
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
        const response = await api.delete(`/dichvu/${idDichVu}`)
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
        const response  = await api.get("/banggia")
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
        const response  = await api.get(`/banggia/${idBangGia}`)
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
        const response = await api.post("/banggia",banggia)
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
        const response = await api.put("/banggia",banggia)
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
        const response = await api.put(`/banggia/${idBangGia}`)
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

export async function uploadGiaCanHo(idBangGia){
    try{
        const response = await api.put(`/banggia/uploadcanho/${idBangGia}`)
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
        const response = await api.put(`/banggia/uploaddichvu/${idBangGia}`)
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
        const response = await api.delete(`/banggia/${idBangGia}`)
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

export async function giaHanHopDong(idHopDong){
    try{
        const response = await api.put(`/hopdong/giahan/${idHopDong}`)
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

export async function giaHanHopDongDichVu(idYeuCauDichVu){
    try{
        const response = await api.put(`/hopdong/dichvu/giahan/${idYeuCauDichVu}`)
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
        const response  = await api.get(`/hoadon/khachhang/${maKhachHang}`)
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

export async function getTaiKhoanList(){
    try{
        const response = await api.get('/taikhoan',{
            headers:getHeader()
        })
        return response.data
    }
    catch(error){
        throw error
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