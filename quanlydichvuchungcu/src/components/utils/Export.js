import * as XLSX from 'xlsx'
import {saveAs} from 'file-saver'
import { jsPDF } from "jspdf"; 
import {formatCurrency,formatTime} from './FormatValue'
export function exportExcel(data,file){
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook,worksheet,'Sheet1')
    const excelBuffer = XLSX.write(workbook,{bookType:"xlsx",type:"array"})
    const blob = new Blob([excelBuffer],{type:'application/octet-stream'})
    saveAs(blob,file+'.xlsx')
}

export function exportPDF(hoaDon){
        if (!hoaDon) return;
        const doc = new jsPDF();
        // Tiêu đề
        doc.setFontSize(16);
        doc.text("Invoice", 20, 20);
    
        // Số hóa đơn
        doc.setFontSize(12);
        doc.text(`Invoice number: ${hoaDon.soHoaDon}`, 20, 30);
    
        // Thời gian tạo
        doc.text(`Create date: ${formatTime(hoaDon.thoiGianTao)}`, 20, 40);
    
        // Thời gian đóng
        doc.text(`Pay date: ${formatTime(hoaDon.thoiGianDong)}`, 20, 50);
    
        // Số tiền đóng
        doc.text(`Mount: ${formatCurrency(hoaDon.tongHoaDon,'vi-VN', 'VND')} VND`, 20, 60);
        if(hoaDon.hopDong!==null){
            // Họ tên khách hàng
            doc.text(`Customer: ${hoaDon.hopDong.khachHang.maKhachHang}`, 20, 70);
        }
        if(hoaDon.yeuCauDichVu!==null){
            // Họ tên khách hàng
            doc.text(`Customer: ${hoaDon.yeuCauDichVu.hopDong.khachHang.maKhachHang}`, 20, 70);
        }
        doc.text(`Relate profile: ${hoaDon.yeuCauDichVu===null?('Hop dong so '+hoaDon.hopDong.idHopDong):
            ('Hop dong dich vu so '+hoaDon.yeuCauDichVu.idYeuCauDichVu)}`, 20, 80);
        // Lưu file PDF
        doc.save(`Invoice_${hoaDon.soHoaDon}.pdf`);
  };
