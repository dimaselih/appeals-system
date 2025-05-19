import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import appealRoutes from './routes/appealRoutes';

dotenv.config();

// Подключение к базе данных
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/appeals', appealRoutes);

// Базовый маршрут
app.get('/', (_req, res) => {
  res.send('API системы обращений работает');
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
