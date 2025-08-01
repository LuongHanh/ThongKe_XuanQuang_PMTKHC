import express from 'express';
import {
  createOverview,
  getOverviewByYear,
  updateOverview,
  deleteOverview,
  getOverviewById,
  exportOverview,
  getAllOverview
} from '../controllers/overview.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/export', verifyToken, exportOverview);
router.get('/', getAllOverview);
router.get('/:year', getOverviewByYear);
router.get('/:id', getOverviewById);
router.post('/', verifyToken, createOverview);
router.put('/:id', verifyToken, updateOverview);
router.delete('/:id', verifyToken, deleteOverview);

export default router;
