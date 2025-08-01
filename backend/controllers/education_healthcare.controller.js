import EducationHealthcare from '../models/EducationHealthcare.js';
import { exportToExcel } from '../utils/excelExport.js';

export const exportEducationHealthcare = async (req, res) => {
  try {
    const data = await EducationHealthcare.findAll();

    const plainData = data.map(item => item.toJSON());

    const columns = [
      { header: 'ID', key: 'id' },
      { header: 'Số trạm y tê', key: 'so_tram_y_te' },
      { header: 'Số phòng khám tư nhân', key: 'so_phong_kham_tu_nhan' },
      { header: 'Số lượng cán bộ y tê', key: 'so_luong_can_bo_y_te' },
      { header: 'Tỷ lệ BHYT', key: 'ty_le_bhyt' },
      { header: 'Tổng số trường học', key: 'tong_so_truong_hoc' },
      { header: 'Tổng số học sinh', key: 'tong_so_hoc_sinh' },
      { header: 'Trường chuẩn quốc gia', key: 'truong_chuan_qg' },
      { header: 'Năm', key: 'year' },
    ];

    const buffer = await exportToExcel(plainData, columns, 'EducationHealthcare');

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename="EducationHealthcare.xlsx"');
    res.send(buffer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lấy tất cả bản ghi
export const getAllEducationHealthcare = async (req, res) => {
  try {
    const records = await EducationHealthcare.findAll();
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy dữ liệu', error });
  }
};

export const getByYearEducationHealthcare = async (req, res) => {
  try {
    const data = await EducationHealthcare.findAll({ where: { year: req.params.year } });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getOneEducationHealthcare = async (req, res) => {
  try {
    const data = await EducationHealthcare.findByPk(req.params.id);
    if (!data) return res.status(404).json({ message: 'EducationHealthcare not found' });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Tạo bản ghi mới
export const createEducationHealthcare = async (req, res) => {
  try {
    const newRecord = await EducationHealthcare.create({ ...req.body, updated_by: req.user.id });
    res.status(201).json(newRecord);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cập nhật bản ghi theo ID
export const updateEducationHealthcare = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await EducationHealthcare.update(req.body, { where: { id } });
    if (updated) {
      const updatedRecord = await EducationHealthcare.findByPk(id);
      res.status(200).json(updatedRecord);
    } else {
      res.status(404).json({ message: 'Không tìm thấy bản ghi để cập nhật' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi cập nhật dữ liệu', error });
  }
};

// Xoá bản ghi theo ID
export const deleteEducationHealthcare = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await EducationHealthcare.destroy({ where: { id } });
    if (deleted) {
      res.status(200).json({ message: 'Xoá thành công' });
    } else {
      res.status(404).json({ message: 'Không tìm thấy bản ghi để xoá' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi xoá dữ liệu', error });
  }
};
