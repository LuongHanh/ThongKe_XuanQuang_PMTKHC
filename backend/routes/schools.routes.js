import express from 'express';
import {
  getAllSchools,
  createSchool,
  updateSchool,
  deleteSchool,
  getSchoolById,
  exportSchools,
  getSchoolByYear
} from '../controllers/schools.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/export', verifyToken, exportSchools);
router.get('/', getAllSchools);           // Lấy toàn bộ
router.get('/:year', getSchoolByYear);        // Lấy theo year
router.get('/:id', getSchoolById);        // Lấy theo ID
router.post('/', verifyToken, createSchool);           // Tạo mới
router.put('/:id', verifyToken, updateSchool);         // Cập nhật theo ID
router.delete('/:id', verifyToken, deleteSchool);      // Xóa theo ID

export default router;
