import School from '../models/School.js';
import { exportToExcel } from '../utils/excelExport.js';

export const exportSchools = async (req, res) => {
  try {
    const data = await School.findAll();

    const plainData = data.map(item => item.toJSON());

    const columns = [
      { header: 'ID', key: 'id' },
      { header: 'Tên trường', key: 'ten_truong' },
      { header: 'Cấp trường', key: 'cap_truong' },
      { header: 'Số lượng học sinh', key: 'so_luong_hoc_sinh' },
      { header: 'Đạt chuẩn quốc gia', key: 'dat_chuan_qg' },
      { header: 'Năm', key: 'year' },
    ];

    const buffer = await exportToExcel(plainData, columns, 'School');

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename="Schools.xlsx"');
    res.send(buffer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllSchools = async (req, res) => {
  try {
    const schools = await School.findAll();
    res.status(200).json(schools);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSchoolByYear = async (req, res) => {
  try {
    const data = await School.findAll({ where: { year: req.params.year } });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getSchoolById = async (req, res) => {
  try {
    const school = await School.findByPk(req.params.id);
    if (!school) return res.status(404).json({ message: 'School not found' });
    res.status(200).json(school);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createSchool = async (req, res) => {
  try {
    const newSchool = await School.create({ ...req.body, updated_by: req.user.id });
    res.status(201).json(newSchool);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateSchool = async (req, res) => {
  try {
    const school = await School.findByPk(req.params.id);
    if (!school) return res.status(404).json({ message: 'School not found' });

    await school.update(req.body);
    res.status(200).json(school);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteSchool = async (req, res) => {
  try {
    const school = await School.findByPk(req.params.id);
    if (!school) return res.status(404).json({ message: 'School not found' });

    await school.destroy();
    res.status(204).end(); // 204: No Content
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
