// models/Villages.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Villages = sequelize.define('Villages', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  ten_thon: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  so_htx: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quy_mo: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  linh_vuc_hoat_dong: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mo_hinh_kinh_te_hieu_qua: {
    type: DataTypes.STRING,
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
  tableName: 'villages',
  timestamps: false,
});

export default Villages;
