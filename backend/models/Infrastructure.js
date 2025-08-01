import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Infrastructure = sequelize.define('Infrastructure', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  duong_gtnt_cung_hoa: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  nha_kien_co: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ty_le_dien: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  ty_le_nuoc_sach: {
    type: DataTypes.FLOAT,
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
  tableName: 'infrastructure',
  timestamps: false,
});

export default Infrastructure;
