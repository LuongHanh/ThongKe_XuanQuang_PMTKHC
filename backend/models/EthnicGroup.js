import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const EthnicGroup = sequelize.define('ethnic_groups', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  ten_dan_toc: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  so_luong: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  updated_by: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  timestamps: false,
  tableName: 'ethnic_groups'
});

export default EthnicGroup;
