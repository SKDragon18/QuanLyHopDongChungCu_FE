import axios from "axios"

export const api = axios.create({
    baseURL:"http://localhost:8080"
})

//Loại phòng
export async function getLoaiPhong(){
    try{
        const response  = await api.get("/canho/loaiphong")
        return response.data
    }catch(error){
        throw new Error("Error fetching danh sách loại phòng")
    }
}

export async function insertLoaiPhong(loaiPhong){
    const response = await api.post("/canho/loaiphong",loaiPhong)
    if(response.status === 200){
        return response.data
    }
    else{
        return false
    }
}

//Điều khoản
export async function getDieuKhoan(){
    try{
        const response  = await api.get("/dieukhoan")
        return response.data
    }catch(error){
        throw new Error("Error fetching danh sách điều khoản")
    }
}

//Căn hộ
export async function getCanHo(){
    try{
        const response  = await api.get("/canho")
        return response.data
    }catch(error){
        throw new Error("Error fetching danh sách căn hộ")
    }
}

export async function getCanHoById(idCanHo){
    try{
        const response  = await api.get(`/canho/${idCanHo}`)
        return response
    }catch(error){
        throw new Error("Error fetching căn hộ")
    }
}

export async function insertCanHo(canHo){
    const response = await api.post("/canho",canHo)
    if(response.status === 200){
        return response.data
    }
    else{
        return false
    }
}

export async function updateCanHo(canHo){
    const response = await api.put("/canho",canHo)
    if(response.status === 200){
        return response
    }
    else{
        return false
    }
}

export async function updateTrangThaiCanHo(idCanHo){
    const response = await api.put(`/canho/${idCanHo}`)
    if(response.status === 200){
        return response
    }
    else{
        return false
    }
}

export async function deleteCanHo(idCanHo){
    const response = await api.delete(`/canho/${idCanHo}`)
    if(response.status === 200){
        return response
    }
    else{
        return false
    }
}

export async function saveHinhAnh(image, idCanHo){
    try{
        const formData  = new FormData()
        formData.append("images", image)
        formData.append("idCanHo", idCanHo)
        const response  = await api.post("/canho/hinhanh",formData)
        console.log(response.data)
        if(response.status === 200){
            return "Thành công"
        }
        return "Thất bại"
    }catch(error){
        return error.data
    }
}

export async function doiHinhAnh(image, idCanHo){
    try{
        const formData  = new FormData()
        formData.append("images", image)
        formData.append("idCanHo", idCanHo)
        const response  = await api.post("/canho/doihinhanh",formData)
        if(response.status === 200){
            return "Thành công"
        }
        return "Thất bại"
    }catch(error){
        return error.data
    }
}



//Dịch vụ
export async function getDichVu(){
    try{
        const response  = await api.get("/dichvu")
        return response.data
    }catch(error){
        throw new Error("Error fetching danh sách dịch vụ")
    }
}

export async function getDichVuById(idDichVu){
    try{
        const response  = await api.get(`/dichvu/${idDichVu}`)
        return response
    }catch(error){
        throw new Error("Error fetching dịch vụ")
    }
}

export async function insertDichVu(dichvu){
    const response = await api.post("/dichvu",dichvu)
    return response
}

export async function updateDichVu(dichvu){
    const response = await api.put("/dichvu",dichvu)
    if(response.status === 200){
        return response
    }
    else{
        return false
    }
}

export async function updateTrangThaiDichVu(dichvu){
    const response = await api.put(`/dichvu/${dichvu}`)
    if(response.status === 200){
        return response
    }
    else{
        return false
    }
}

export async function deleteDichVu(idDichVu){
    const response = await api.delete(`/dichvu/${idDichVu}`)
    if(response.status === 200){
        return response
    }
    else{
        return false
    }
}

//Quản lý giá
export async function getBangGia(){
    try{
        const response  = await api.get("/banggia")
        return response.data
    }catch(error){
        throw new Error("Error fetching danh sách dịch vụ")
    }
}

export async function getBangGiaById(idBangGia){
    try{
        const response  = await api.get(`/banggia/${idBangGia}`)
        return response
    }catch(error){
        throw new Error("Error fetching dịch vụ")
    }
}

export async function insertBangGia(banggia){
    const response = await api.post("/banggia",banggia)
    return response
}

export async function updateBangGia(banggia){
    const response = await api.put("/banggia",banggia)
    if(response.status === 200){
        return response
    }
    else{
        return false
    }
}

export async function updateTrangThaiBangGia(idBangGia){
    const response = await api.put(`/banggia/${idBangGia}`)
    if(response.status === 200){
        return response
    }
    else{
        return false
    }
}

export async function uploadGiaCanHo(idBangGia){
    const response = await api.put(`/banggia/uploadcanho/${idBangGia}`)
    if(response.status === 200){
        return response
    }
    else{
        return false
    }
}

export async function uploadGiaDichVu(idBangGia){
    const response = await api.put(`/banggia/uploaddichvu/${idBangGia}`)
    if(response.status === 200){
        return response
    }
    else{
        return false
    }
}


export async function deleteBangGia(idBangGia){
    const response = await api.delete(`/banggia/${idBangGia}`)
    if(response.status === 200){
        return response
    }
    else{
        return false
    }
}

//Khách hàng
export async function getKhachHangById(idKhachHang){
    try{
        const response  = await api.get(`/nguoidung/khachhang/${idKhachHang}`)
        return response
    }catch(error){
        throw new Error("Error fetching căn hộ")
    }
}

export async function getCanHoChoThue(){
    try{
        const response  = await api.get("/hienthi/canhochothue")
        return response.data
    }catch(error){
        throw new Error("Error fetching danh sách căn hộ")
    }
}

export async function getDichVuChoDangKy(){
    try{
        const response  = await api.get("/hienthi/dichvu")
        return response.data
    }catch(error){
        throw new Error("Error fetching danh sách dịch vụ")
    }
}

export async function getCanHoChoThueById(idCanHo){
    try{
        const response  = await api.get(`/hienthi/canhochothue/${idCanHo}`)
        return response
    }catch(error){
        throw new Error("Error fetching căn hộ")
    }
}

export async function getDichVuChoDangKyById(idDichVu){
    try{
        const response  = await api.get(`/hienthi/dichvu/${idDichVu}`)
        return response
    }catch(error){
        throw new Error("Error fetching căn hộ")
    }
}

export async function dangKyHopDong(hopdong){
    const response = await api.post("/hopdong",hopdong)
    return response
}

export async function dangKyDichVu(yeuCauDichVu){
    const response = await api.post("/hopdong/dichvu",yeuCauDichVu)
    return response
}

export async function giaHanHopDong(idHopDong){
    const response = await api.put(`/hopdong/giahan/${idHopDong}`)
    return response
}

export async function giaHanHopDongDichVu(idYeuCauDichVu){
    const response = await api.put(`/hopdong/dichvu/giahan/${idYeuCauDichVu}`)
    return response
}

export async function huyHopDong(idHopDong){
    const response = await api.put(`/hopdong/huy/${idHopDong}`)
    return response
}

export async function huyHopDongDichVu(idYeuCauDichVu){
    const response = await api.put(`/hopdong/dichvu/huy/${idYeuCauDichVu}`)
    return response
}
export async function getAllHoaDon(){
    try{
        const response  = await api.get(`/hoadon`)
        return response
    }catch(error){
        throw new Error("Error fetching danh sách hóa đơn")
    }
}
export async function getHoaDon(maKhachHang){
    try{
        const response  = await api.get(`/hoadon/khachhang/${maKhachHang}`)
        return response.data
    }catch(error){
        throw new Error("Error fetching danh sách hóa đơn")
    }
}

export async function getAllHopDong(){
    try{
        const response  = await api.get('/hopdong')
        return response.data
    }catch(error){
        throw new Error("Error fetching danh sách hợp đồng")
    }
}

export async function getAllHopDongKhachHang(maKhachHang){
    try{
        const response  = await api.get(`/hopdong/khachhangall/${maKhachHang}`)
        return response.data
    }catch(error){
        throw new Error("Error fetching danh sách hợp đồng")
    }
}

export async function getHopDongKhachHang(idHopDong){
    try{
        const response  = await api.get(`/hopdong/khachhang/${idHopDong}`)
        return response.data
    }catch(error){
        throw new Error("Error fetching hợp đồng")
    }
}

export async function getAllHopDongDichVu(){
    try{
        const response  = await api.get('/hopdong/dichvu')
        return response.data
    }catch(error){
        throw new Error("Error fetching danh sách hợp đồng dịch vụ")
    }
}

export async function getAllHopDongDichVuKhachHang(maKhachHang){
    try{
        const response  = await api.get(`/hopdong/dichvu/khachhangall/${maKhachHang}`)
        return response.data
    }catch(error){
        throw new Error("Error fetching danh sách hợp đồng dịch vụ")
    }
}

export async function getHopDongDichVuKhachHang(idYeuCauDichVu){
    try{
        const response  = await api.get(`/hopdong/dichvu/khachhang/${idYeuCauDichVu}`)
        return response.data
    }catch(error){
        throw new Error("Error fetching hợp đồng dịch vụ")
    }
}