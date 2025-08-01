// routes/villages.routes.js
import express from 'express';
import {
  createVillage,
  getVillagesByYear,
  updateVillage,
  deleteVillage,
  getVillagesById,
  exportVillages,
  getAllVillages
} from '../controllers/villages.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/export', verifyToken, exportVillages);
router.get('/:year', getVillagesByYear);
router.get('/', getAllVillages);
router.get('/:id', getVillagesById);
router.post('/', verifyToken, createVillage);
router.put('/:id', verifyToken, updateVillage);
router.delete('/:id', verifyToken, deleteVillage);

export default router;
