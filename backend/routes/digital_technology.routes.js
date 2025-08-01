import express from 'express';
import {
  getAllDigitalTech,
  createDigitalTech,
  updateDigitalTech,
  deleteDigitalTech,
  getOneDigitalTech,
  exportDigitalTech,
  getByYearDigitalTech
} from '../controllers/digital_technology.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/export', verifyToken, exportDigitalTech);
router.get('/', getAllDigitalTech);
router.get('/:year', getByYearDigitalTech);
router.get('/:id', getOneDigitalTech);
router.post('/', verifyToken, createDigitalTech);
router.put('/:id', verifyToken, updateDigitalTech);
router.delete('/:id', verifyToken, deleteDigitalTech);

export default router;
