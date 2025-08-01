import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const EducationHealthcare = sequelize.define('EducationHealthcare', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  so_tram_y_te: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  so_phong_kham_tu_nhan: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  so_luong_can_bo_y_te: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ty_le_bhyt: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  tong_so_truong_hoc: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tong_so_hoc_sinh: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  truong_chuan_qg: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  updated_by: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  tableName: 'education_healthcare',
  timestamps: false,
});

export default EducationHealthcare;
