import EthnicGroup from '../models/EthnicGroup.js';
import { exportToExcel } from '../utils/excelExport.js';

export const exportEthnicGroup = async (req, res) => {
  try {
    const data = await EthnicGroup.findAll();

    const plainData = data.map(item => item.toJSON());

    const columns = [
      { header: 'ID', key: 'id' },
      { header: 'Tên dân tộc', key: 'ten_dan_toc' },
      { header: 'Số lượng', key: 'so_luong' },
      { header: 'Năm', key: 'year' },
    ];

    const buffer = await exportToExcel(plainData, columns, 'EthnicGroup');

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename="EthnicGroup.xlsx"');
    res.send(buffer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET all
export const getAllEthnicGroups = async (req, res) => {
  try {
    const groups = await EthnicGroup.findAll();
    res.json(groups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getByYearEthnicGroups = async (req, res) => {
  try {
    const data = await EthnicGroup.findAll({ where: { year: req.params.year } });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getOneEthnicGroups = async (req, res) => {
  try {
    const data = await EthnicGroup.findByPk(req.params.id);
    if (!data) return res.status(404).json({ message: 'EthnicGroup not found' });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST
export const createEthnicGroup = async (req, res) => {
  try {
    const newGroup = await EthnicGroup.create({ ...req.body, updated_by: req.user.id });
    res.status(201).json(newGroup);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT
export const updateEthnicGroup = async (req, res) => {
  try {
    const id = req.params.id;
    const group = await EthnicGroup.findByPk(id);
    if (!group) return res.status(404).json({ message: 'Không tìm thấy dân tộc' });

    await group.update(req.body);
    res.json(group);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE
export const deleteEthnicGroup = async (req, res) => {
  try {
    const id = req.params.id;
    const group = await EthnicGroup.findByPk(id);
    if (!group) return res.status(404).json({ message: 'Không tìm thấy dân tộc' });

    await group.destroy();
    res.json({ message: 'Đã xóa thành công' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
