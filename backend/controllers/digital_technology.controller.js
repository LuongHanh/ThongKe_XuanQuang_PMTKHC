import DigitalTechnology from '../models/DigitalTechnology.js';
import { exportToExcel } from '../utils/excelExport.js';

export const exportDigitalTech = async (req, res) => {
  try {
    const data = await DigitalTechnology.findAll();

    const plainData = data.map(item => item.toJSON());

    const columns = [
      { header: 'ID', key: 'id' },
      { header: 'Dịch vụ công trực tuyến', key: 'dich_vu_cong_tt' },
      { header: 'Đội công nghệ số', key: 'doi_cong_nghe_so' },
      { header: 'Tỷ lệ điện thoại', key: 'ty_le_dien_thoai' },
      { header: 'Tỷ lệ internet', key: 'ty_le_internet' },
      { header: 'Số người biết dùng công nghệ số', key: 'so_nguoi_biet_cong_nghe_so' },
      { header: 'Năm', key: 'year' },
    ];

    const buffer = await exportToExcel(plainData, columns, 'DigitalTechnology');

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename="DigitalTechnology.xlsx"');
    res.send(buffer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET all
export const getAllDigitalTech = async (req, res) => {
  try {
    const data = await DigitalTechnology.findAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy dữ liệu', error });
  }
};

export const getByYearDigitalTech = async (req, res) => {
  try {
    const data = await DigitalTechnology.findAll({ where: { year: req.params.year } });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getOneDigitalTech = async (req, res) => {
  try {
    const data = await deleteDigitalTech.findByPk(req.params.id);
    if (!data) return res.status(404).json({ message: 'deleteDigitalTech not found' });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST new
export const createDigitalTech = async (req, res) => {
  try {
    const newRecord = await DigitalTechnology.create({ ...req.body, updated_by: req.user.id });
    res.status(201).json(newRecord);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi tạo dữ liệu', error });
  }
};

// PUT update
export const updateDigitalTech = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await DigitalTechnology.update(req.body, {
      where: { id },
    });

    if (updated) {
      const updatedRecord = await DigitalTechnology.findByPk(id);
      res.json(updatedRecord);
    } else {
      res.status(404).json({ message: 'Không tìm thấy bản ghi để cập nhật' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi cập nhật dữ liệu', error });
  }
};

// DELETE
export const deleteDigitalTech = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await DigitalTechnology.destroy({ where: { id } });

    if (deleted) {
      res.json({ message: 'Xóa thành công' });
    } else {
      res.status(404).json({ message: 'Không tìm thấy bản ghi để xóa' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi xóa dữ liệu', error });
  }
};
