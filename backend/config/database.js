import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,       // Tên DB
  process.env.DB_USER,       // Tên user SQL Server
  process.env.DB_PASSWORD,   // Mật khẩu
  {
    host: process.env.DB_SERVER, // thường là 'localhost'
    dialect: 'mssql',
    dialectOptions: {
      options: {
        encrypt: false,
        trustServerCertificate: true,
        server: process.env.DB_SERVER || 'localhost',
      },
    },
    logging: false,
  }
);

export default sequelize;
