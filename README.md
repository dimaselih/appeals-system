# Система работы с обращениями

API для управления обращениями с возможностью создания, обработки и отслеживания статусов обращений.

## Технологии

- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- TypeScript

## Установка и запуск

1. Клонировать репозиторий:
```bash
git clone https://github.com/dimaselih/appeals-system.git
cd appeals-system
```

2. Установить зависимости:
```bash
npm install
```

3. Настроить базу данных:
* Создайте базу данных PostgreSQL с именем appeals
* Или настройте автоматическое создание базы данных через код

4. Создать файл .env в корне проекта:
```
PORT=3000
DB_NAME=appeals
DB_USER=postgres
DB_PASSWORD=ваш_пароль
DB_HOST=localhost
```

5. Запустить приложение в режиме разработки:
```bash
npm run dev
```

6. Для сборки проекта:
```bash
npm run build
```

7. Для запуска в продакшн режиме:
```bash
npm start
```

Структура проекта
```
appeals-system/
├── src/
│   ├── config/       # Конфигурация приложения и базы данных
│   ├── controllers/  # Контроллеры для обработки запросов
│   ├── models/       # Модели данных
│   ├── routes/       # Маршруты API
│   ├── services/     # Бизнес-логика
│   └── index.ts      # Точка входа в приложение
├── .env              # Переменные окружения
├── package.json      # Зависимости и скрипты
└── tsconfig.json     # Конфигурация TypeScript
```
