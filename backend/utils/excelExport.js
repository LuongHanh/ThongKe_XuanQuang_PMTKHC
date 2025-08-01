// utils/excelExport.js
import ExcelJS from 'exceljs';

export const exportToExcel = async (data, columns, sheetName = 'Sheet1') => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(sheetName);

  // Thêm tiêu đề
  worksheet.columns = columns.map(col => ({
    header: col.header,
    key: col.key,
    width: col.width || 20,
  }));

  // Thêm dữ liệu
  data.forEach(item => {
    worksheet.addRow(item);
  });

  // Xuất buffer để gửi cho client
  const buffer = await workbook.xlsx.writeBuffer();
  return buffer;
};
