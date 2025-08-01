import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const DigitalTechnology = sequelize.define('DigitalTechnology', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  dich_vu_cong_tt: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  doi_cong_nghe_so: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ty_le_dien_thoai: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  ty_le_internet: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  so_nguoi_biet_cong_nghe_so: {
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
  tableName: 'digital_technology',
  timestamps: false,
});

export default DigitalTechnology;
