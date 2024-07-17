import axios from "axios"

export const api = axios.create({
    baseURL:"http://localhost:8080"
})

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

export async function insertDichVu(dichVu){
    const response = await api.post("/dichvu",dichvu)
    if(response.status === 200){
        return true
    }
    else{
        return false
    }
}

export async function getDichVu(){
    try{
        const response  = await api.get("/dichvu")
        return response.data
    }catch(error){
        throw new Error("Error fetching dich vu")
    }
}

