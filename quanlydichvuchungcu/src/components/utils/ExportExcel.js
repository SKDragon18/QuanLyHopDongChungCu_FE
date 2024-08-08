import * as XLSX from 'xlsx'
import {saveAs} from 'file-saver'
export function exportExcel(data,file){
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook,worksheet,'Sheet1')
    const excelBuffer = XLSX.write(workbook,{bookType:"xlsx",type:"array"})
    const blob = new Blob([excelBuffer],{type:'application/octet-stream'})
    saveAs(blob,file+'.xlsx')
}