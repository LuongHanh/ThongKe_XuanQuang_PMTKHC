// src/utils/exportToExcel.js
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const exportToExcel = (data, fileName = 'exported') => {
  try {
    if (!Array.isArray(data)) {
      throw new Error('Dữ liệu không hợp lệ (không phải mảng)');
    }

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    saveAs(blob, `${fileName}.xlsx`);
  } catch (err) {
    console.error('❌ Lỗi khi export Excel:', err.message);
  }
};

export default exportToExcel;
