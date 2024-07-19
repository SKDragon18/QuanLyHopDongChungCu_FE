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

export async function updateTrangThaiBangGia(banggia){
    const response = await api.put(`/banggia/${banggia}`)
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