import { exportToExcel } from '../utils/excelExport.js';
import Economy from '../models/Economy.js';

export const exportEconomy = async (req, res) => {
  try {
    const data = await Economy.findAll();

    const plainData = data.map(item => item.toJSON());

    const columns = [
      { header: 'ID', key: 'id' },
      { header: 'Số hộ nghèo', key: 'so_ho_ngheo' },
      { header: 'Số hộ cần nghèo', key: 'so_ho_can_ngheo' },
      { header: 'Thu nhập bình quân', key: 'thu_nhap_binh_quan' },
      { header: 'Số thôn', key: 'so_thon' },
      { header: 'Số hộ kinh doanh nhỏ lẻ', key: 'so_ho_kinh_doanh_nho_le' },
      { header: 'Năm', key: 'year' },
    ];

    const buffer = await exportToExcel(plainData, columns, 'Economy');

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename="Economy.xlsx"');
    res.send(buffer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createEconomy = async (req, res) => {
  try {
    const data = await Economy.create({ ...req.body, updated_by: req.user.id });
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET all
export const getAllEconomy = async (req, res) => {
  try {
    const groups = await Economy.findAll();
    res.json(groups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEconomyByYear = async (req, res) => {
  try {
    const data = await Economy.findAll({ where: { year: req.params.year } });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getEconomyById = async (req, res) => {
  try {
    const data = await Economy.findByPk(req.params.id);
    if (!data) return res.status(404).json({ message: 'Economy not found' });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateEconomy = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Economy.update({ ...req.body }, { where: { id } });
    res.json({ message: 'Updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteEconomy = async (req, res) => {
  try {
    const id = req.params.id;
    await Economy.destroy({ where: { id } });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
