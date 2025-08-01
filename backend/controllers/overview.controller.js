import Overview from '../models/Overview.js';
import { exportToExcel } from '../utils/excelExport.js';

export const exportOverview = async (req, res) => {
  try {
    const data = await Overview.findAll();

    const plainData = data.map(item => item.toJSON());

    const columns = [
      { header: 'ID', key: 'id' },
      { header: 'Diện tích', key: 'dien_tich' },
      { header: 'Dân số', key: 'dan_so' },
      { header: 'Tổng số dân tộc', key: 'tong_so_dan_toc' },
      { header: 'Tôn giáo', key: 'ton_giao' },
      { header: 'Năm', key: 'year' },
    ];

    const buffer = await exportToExcel(plainData, columns, 'Overview');

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename="Overview.xlsx"');
    res.send(buffer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET all
export const getAllOverview = async (req, res) => {
  try {
    const groups = await Overview.findAll();
    res.json(groups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/overview/:year
export const getOverviewByYear = async (req, res) => {
  try {
    const overview = await Overview.findAll({ where: { year: req.params.year } });
    if (!overview) {
      return res.status(404).json({ message: 'Không tìm thấy tổng quan cho năm này.' });
    }

    res.json(overview);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server khi lấy dữ liệu tổng quan.', error });
  }
};

export const getOverviewById = async (req, res) => {
  try {
    const overview = await Overview.findByPk(req.params.id);
    if (!overview) return res.status(404).json({ message: 'Overview not found' });
    res.status(200).json(overview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /api/overview
export const createOverview = async (req, res) => {
  try {
    const newOverview = await Overview.create({ ...req.body, updated_by: req.user.id });
    res.status(201).json(newOverview);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server khi tạo mới tổng quan.', error });
  }
};

// PUT /api/overview/:id
export const updateOverview = async (req, res) => {
  try {
    const { id } = req.params;
    const [updatedRows] = await Overview.update(req.body, { where: { id } });

    if (updatedRows === 0) {
      return res.status(404).json({ message: 'Không tìm thấy hoặc không cập nhật được.' });
    }

    const updatedOverview = await Overview.findByPk(id);
    res.json(updatedOverview);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server khi cập nhật tổng quan.', error });
  }
};

// DELETE /api/overview/:id
export const deleteOverview = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRows = await Overview.destroy({ where: { id } });

    if (deletedRows === 0) {
      return res.status(404).json({ message: 'Không tìm thấy bản ghi để xóa.' });
    }

    res.json({ message: 'Xóa thành công.' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server khi xóa tổng quan.', error });
  }
};
