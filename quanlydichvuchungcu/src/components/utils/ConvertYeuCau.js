export function sequenceDuyetCanHo(yeuCau,duyet){
    let sequence = ''
    if(yeuCau===0){
        sequence = sequence + 'Đăng ký '
    }
    else if(yeuCau===1){
        sequence = sequence + 'Gia hạn '
    }
    else{
        sequence = sequence + 'Hủy '
    }
    if(duyet===0){
        sequence = sequence + 'đang chờ duyệt'
    }
    else if(duyet===1){
        sequence = sequence + 'được đồng ý'
    }
    else{
        sequence = sequence + 'bị từ chối'
    }
    return sequence
}

export function sequenceDuyetDichVu(yeuCau,duyet){
    let sequence = ''
    if(yeuCau===0){
        sequence = sequence + 'Đăng ký '
    }
    else{
        sequence = sequence + 'Hủy '
    }
    if(duyet===0){
        sequence = sequence + 'đang chờ duyệt'
    }
    else if(duyet===1){
        sequence = sequence + 'được đồng ý'
    }
    else{
        sequence = sequence + 'bị từ chối'
    }
    return sequence
}

export function sequenceYeuCauCanHo(yeuCau){
    let sequence = ''
    if(yeuCau===0){
        sequence = sequence + 'Đăng ký '
    }
    else if(yeuCau===1){
        sequence = sequence + 'Gia hạn '
    }
    else{
        sequence = sequence + 'Hủy '
    }
    return sequence
}

export function sequenceYeuCauDichVu(yeuCau){
    let sequence = ''
    if(yeuCau===0){
        sequence = sequence + 'Đăng ký '
    }
    else if(yeuCau===1){
        sequence = sequence + 'Hủy '
    }
    else{
        sequence = sequence + 'Lỗi '
    }
    return sequence
}