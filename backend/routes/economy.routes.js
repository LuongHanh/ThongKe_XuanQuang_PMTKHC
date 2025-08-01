// routes/economy.routes.js
import express from 'express';
import {
  createEconomy,
  getEconomyByYear,
  updateEconomy,
  deleteEconomy,
  getEconomyById,
  exportEconomy,
  getAllEconomy
} from '../controllers/economy.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/export', verifyToken, exportEconomy);
router.get('/:year', getEconomyByYear);
router.get('/:id', getEconomyById);
router.get('/', getAllEconomy);
router.post('/', verifyToken, createEconomy);
router.put('/:id', verifyToken, updateEconomy);
router.delete('/:id', verifyToken, deleteEconomy);

export default router;
