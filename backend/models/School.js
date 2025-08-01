import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const School = sequelize.define('School', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  ten_truong: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cap_truong: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  so_luong_hoc_sinh: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  dat_chuan_qg: {
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
  tableName: 'schools',
  timestamps: false,
});

export default School;
