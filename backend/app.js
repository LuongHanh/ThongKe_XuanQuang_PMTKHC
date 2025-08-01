import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/database.js';
// Import routes
import authRoutes from './routes/auth.routes.js';
import overviewRoutes from './routes/overview.routes.js';
import digitalTechnologyRoutes from './routes/digital_technology.routes.js';
import economyRoutes from './routes/economy.routes.js';
import educationHealthcareRoutes from './routes/education_healthcare.routes.js';
import ethnicGroupsRoutes from './routes/ethnic_groups.routes.js';
import infrastructureRoutes from './routes/infrastructure.routes.js';
import shoolsRoutes from './routes/schools.routes.js';
import villagesRoutes from './routes/villages.routes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/overview', overviewRoutes);
app.use('/api/digital-technology', digitalTechnologyRoutes);
app.use('/api/economy', economyRoutes);
app.use('/api/education-healthcare', educationHealthcareRoutes);
app.use('/api/ethnic-groups', ethnicGroupsRoutes);
app.use('/api/infrastructure', infrastructureRoutes);
app.use('/api/schools', shoolsRoutes);
app.use('/api/villages', villagesRoutes);
// Test DB Sequelize
app.get('/test-db', async (req, res) => {
  try {
    await sequelize.authenticate();
    res.json({ message: 'Kết nối DB Sequelize thành công!' });
  } catch (error) {
    console.error('Lỗi kết nối DB:', error);
    res.status(500).json({ error: 'Không kết nối được DB' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server chạy ở cổng ${PORT}`);
});
