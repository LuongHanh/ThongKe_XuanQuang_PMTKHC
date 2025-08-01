import express from 'express';
import {
  getAllEducationHealthcare,
  createEducationHealthcare,
  updateEducationHealthcare,
  deleteEducationHealthcare,
  getOneEducationHealthcare,
  exportEducationHealthcare,
  getByYearEducationHealthcare
} from '../controllers/education_healthcare.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/export', verifyToken, exportEducationHealthcare);
router.get('/', getAllEducationHealthcare);
router.get('/:year', getByYearEducationHealthcare);
router.get('/:id', getOneEducationHealthcare);
router.post('/', verifyToken, createEducationHealthcare);
router.put('/:id', verifyToken, updateEducationHealthcare);
router.delete('/:id', verifyToken, deleteEducationHealthcare);

export default router;
