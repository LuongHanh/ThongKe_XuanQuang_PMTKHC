// models/Economy.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Economy = sequelize.define('Economy', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  so_ho_ngheo: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  so_ho_can_ngheo: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  thu_nhap_binh_quan: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  so_thon: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  so_ho_kinh_doanh_nho_le: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  updated_by: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'economy',
  timestamps: false,
});

export default Economy;
