// models/Overview.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Overview = sequelize.define('Overview', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  dien_tich: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  dan_so: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  tong_so_dan_toc: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  ton_giao: {
    type: DataTypes.INTEGER,
    allowNull: true,
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
  tableName: 'overview',
  timestamps: false,
});

export default Overview;
