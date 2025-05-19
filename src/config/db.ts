import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Подключение к postgres (без указания конкретной базы данных)
const setupDatabase = async (): Promise<void> => {
  try {
    const adminSequelize = new Sequelize('postgres', process.env.DB_USER || 'postgres', process.env.DB_PASSWORD || 'postgres', {
      host: process.env.DB_HOST || 'localhost',
      dialect: 'postgres',
      logging: false
    });

    await adminSequelize.authenticate();
    console.log('Connected to PostgreSQL');

    // Проверяем существование базы данных
    const dbName = process.env.DB_NAME || 'appeals';
    const [results] = await adminSequelize.query(
      `SELECT 1 FROM pg_database WHERE datname = '${dbName}'`
    ) as [any[], unknown];

    // Если база данных не существует, создаем её
    if (results.length === 0) {
      console.log(`Database ${dbName} does not exist, creating...`);
      await adminSequelize.query(`CREATE DATABASE ${dbName}`);
      console.log(`Database ${dbName} created successfully`);
    }

    await adminSequelize.close();
  } catch (error: any) {
    console.error('Unable to connect to the database:', error.message);
    process.exit(1);
  }
};

const sequelize = new Sequelize(
  process.env.DB_NAME || 'appeals',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || 'postgres',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

export const connectDB = async (): Promise<void> => {
  try {
    // Сначала настраиваем базу данных (создаем, если не существует)
    await setupDatabase();
    
    // Затем подключаемся к созданной базе данных
    await sequelize.authenticate();
    console.log('PostgreSQL connection has been established successfully.');
    
    // Синхронизация моделей с базой данных
    await sequelize.sync();
    console.log('Database synchronized');
  } catch (error: any) {
    console.error('Unable to connect to the database:', error.message);
    process.exit(1);
  }
};

export default sequelize;
