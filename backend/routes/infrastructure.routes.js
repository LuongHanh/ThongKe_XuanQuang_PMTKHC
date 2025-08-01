import express from 'express';
import {
  getAllInfrastructure,
  createInfrastructure,
  updateInfrastructure,
  deleteInfrastructure,
  getOneInfrastructure,
  exportInfrastructure,
  getByYearInfrastructure
} from '../controllers/infrastructure.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/export', verifyToken, exportInfrastructure);
router.get('/', getAllInfrastructure);
router.get('/:year', getByYearInfrastructure);
router.get('/:id', getOneInfrastructure);
router.post('/', verifyToken, createInfrastructure);
router.put('/:id', verifyToken, updateInfrastructure);
router.delete('/:id', verifyToken, deleteInfrastructure);

export default router;
