import Infrastructure from '../models/Infrastructure.js';
import { exportToExcel } from '../utils/excelExport.js';

export const exportInfrastructure = async (req, res) => {
  try {
    const data = await Infrastructure.findAll();

    const plainData = data.map(item => item.toJSON());

    const columns = [
      { header: 'ID', key: 'id' },
      { header: 'Đường GTNT được cứng hoá', key: 'duong_gtnt_cung_hoa' },
      { header: 'Nhà kiên cố', key: 'nha_kien_co' },
      { header: 'Tỉ lệ sử dụng điện an toàn', key: 'ti_le_dien' },
      { header: 'Tỉ lệ dụng nước sạch', key: 'ti_le_nuoc_sach' },
      { header: 'Năm', key: 'year' },
    ];

    const buffer = await exportToExcel(plainData, columns, 'Infrastructure');

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename="Infrastructure.xlsx"');
    res.send(buffer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET all records
export const getAllInfrastructure = async (req, res) => {
  try {
    const data = await Infrastructure.findAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy dữ liệu hạ tầng', error });
  }
};

export const getByYearInfrastructure = async (req, res) => {
  try {
    const data = await Infrastructure.findAll({ where: { year: req.params.year } });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getOneInfrastructure = async (req, res) => {
  try {
    const data = await Infrastructure.findByPk(req.params.id);
    if (!data) return res.status(404).json({ message: 'Infrastructure not found' });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST create new record
export const createInfrastructure = async (req, res) => {
  try {
    const newRecord = await Infrastructure.create({ ...req.body, updated_by: req.user.id });
    res.status(201).json(newRecord);
  } catch (error) {
    res.status(400).json({ message: 'Lỗi khi tạo bản ghi hạ tầng', error });
  }
};

// PUT update by ID
export const updateInfrastructure = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Infrastructure.update(req.body, { where: { id } });

    if (updated) {
      const updatedRecord = await Infrastructure.findByPk(id);
      res.status(200).json(updatedRecord);
    } else {
      res.status(404).json({ message: 'Không tìm thấy bản ghi để cập nhật' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Lỗi khi cập nhật bản ghi hạ tầng', error });
  }
};

// DELETE by ID
export const deleteInfrastructure = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Infrastructure.destroy({ where: { id } });

    if (deleted) {
      res.status(200).json({ message: 'Đã xóa bản ghi thành công' });
    } else {
      res.status(404).json({ message: 'Không tìm thấy bản ghi để xóa' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi xóa bản ghi hạ tầng', error });
  }
};
