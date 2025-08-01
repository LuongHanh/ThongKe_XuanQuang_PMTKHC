import express from 'express';
import {
  getAllEthnicGroups,
  createEthnicGroup,
  updateEthnicGroup,
  deleteEthnicGroup,
  getOneEthnicGroups,
  exportEthnicGroup,
  getByYearEthnicGroups
} from '../controllers/ethnic_groups.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/export', verifyToken, exportEthnicGroup);
router.get('/', getAllEthnicGroups);
router.get('/:year', getByYearEthnicGroups);
router.get('/:id', getOneEthnicGroups);
router.post('/', verifyToken, createEthnicGroup);
router.put('/:id', verifyToken, updateEthnicGroup);
router.delete('/:id', verifyToken, deleteEthnicGroup);

export default router;
