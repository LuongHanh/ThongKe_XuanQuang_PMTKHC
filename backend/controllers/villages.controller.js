import { exportToExcel } from '../utils/excelExport.js';
import Villages from '../models/Villages.js';
import User from '../models/User.js';

export const exportVillages = async (req, res) => {
  try {
    const data = await Villages.findAll();

    const plainData = data.map(item => item.toJSON());

    const columns = [
      { header: 'ID', key: 'id' },
      { header: 'Tên thôn', key: 'ten_thon' },
      { header: 'Số HTX', key: 'so_htx' },
      { header: 'Quy mô', key: 'quy_mo' },
      { header: 'Lĩnh vực hoạt động', key: 'linh_vuc_hoat_dong' },
      { header: 'Mô hình kinh tế hiệu quả', key: 'mo_hinh_kinh_te_hieu_qua' },
      { header: 'Năm', key: 'year' },
    ];

    const buffer = await exportToExcel(plainData, columns, 'Villages');

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename="villages.xlsx"');
    res.send(buffer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createVillage = async (req, res) => {
  try {
    const data = await Villages.create({ ...req.body, updated_by: req.user.id });
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET all
export const getAllVillages = async (req, res) => {
  try {
    const groups = await Villages.findAll();
    res.json(groups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getVillagesByYear = async (req, res) => {
  try {
    const data = await Villages.findAll({ where: { year: req.params.year } });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getVillagesById = async (req, res) => {
  try {
    const villages = await Villages.findByPk(req.params.id);
    if (!villages) return res.status(404).json({ message: 'Village not found' });
    res.status(200).json(villages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateVillage = async (req, res) => {
  try {
    const id = req.params.id;
    await Villages.update(req.body, { where: { id } });
    res.json({ message: 'Village updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteVillage = async (req, res) => {
  try {
    const id = req.params.id;
    await Villages.destroy({ where: { id } });
    res.json({ message: 'Village deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

