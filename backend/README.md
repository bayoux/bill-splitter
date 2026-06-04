# Backend

NestJS REST API для Bill Splitter. Управляет блюдами и QR-кодами, хранит данные в PostgreSQL, файлы — в AWS S3.

## Запуск

```bash
# Dev режим с hot reload
pnpm dev

# Production сборка
pnpm build
node dist/main
```

## Переменные окружения

Скопируй `.env.example` в `.env` и заполни значения:

```bash
cp .env.example .env
```

| Переменная              | Описание              | Пример                  |
| ----------------------- | --------------------- | ----------------------- |
| `DB_HOST`               | Хост PostgreSQL       | `localhost`             |
| `DB_PORT`               | Порт PostgreSQL       | `5432`                  |
| `DB_USERNAME`           | Пользователь БД       | `postgres`              |
| `DB_PASSWORD`           | Пароль БД             |                         |
| `DB_NAME`               | Имя базы данных       | `bill_splitter`         |
| `AWS_ACCESS_KEY_ID`     | AWS ключ доступа      |                         |
| `AWS_SECRET_ACCESS_KEY` | AWS секретный ключ    |                         |
| `AWS_REGION`            | AWS регион            | `us-east-1`             |
| `AWS_BUCKET_NAME`       | Имя S3 бакета         |                         |
| `ALLOWED_ORIGIN`        | CORS origin фронтенда | `http://localhost:5173` |
| `PORT`                  | Порт сервера          | `3000`                  |
| `NODE_ENV`              | Окружение             | `development`           |

## API

Base URL: `http://localhost:3000`

### Блюда `/dishes`

| Метод    | Путь          | Описание             | Тело                          |
| -------- | ------------- | -------------------- | ----------------------------- |
| `GET`    | `/dishes`     | Список всех блюд     | —                             |
| `GET`    | `/dishes/:id` | Получить блюдо по ID | —                             |
| `POST`   | `/dishes`     | Создать блюдо        | `name`, `price` (form-data)   |
| `PATCH`  | `/dishes/:id` | Обновить блюдо       | `name?`, `price?` (form-data) |
| `DELETE` | `/dishes/:id` | Удалить блюдо        | —                             |

**Пример блюда:**

```json
{
  "id": 1,
  "name": "Борщ",
  "price": 150.0
}
```

**Валидация:**

- `name` — строка, не пустая, максимум 255 символов
- `price` — положительное число, максимум 2 знака после запятой, минимум 0.01

### QR-код `/qr-code`

Хранится только один QR-код. Загрузка нового автоматически удаляет предыдущий.

| Метод    | Путь       | Описание            | Тело                         |
| -------- | ---------- | ------------------- | ---------------------------- |
| `GET`    | `/qr-code` | Получить текущий QR | —                            |
| `POST`   | `/qr-code` | Загрузить новый QR  | `file` (multipart/form-data) |
| `DELETE` | `/qr-code` | Удалить QR          | —                            |

**Ограничения загрузки:** до 5 МБ, форматы JPEG / PNG / WebP.

**Пример ответа GET:**

```json
{
  "id": 1,
  "qrPath": "https://bucket.s3.region.amazonaws.com/qr-1234.png",
  "fileSize": 45312,
  "s3Key": "qr-1234.png"
}
```

## Структура

```
src/
├── dishes/
│   ├── dto/
│   │   ├── create-dish.dto.ts   # Валидация создания
│   │   └── update-dish.dto.ts   # Валидация обновления
│   ├── dish.entity.ts           # TypeORM сущность
│   ├── dishes.controller.ts     # HTTP обработчики
│   ├── dishes.module.ts
│   └── dishes.service.ts        # Бизнес-логика
├── qr-code/
│   ├── qr-code.controller.ts    # HTTP обработчики
│   ├── qr-code.entity.ts        # TypeORM сущность
│   ├── qr-code.module.ts
│   ├── qr-code.service.ts       # Бизнес-логика
│   └── s3.service.ts            # Работа с AWS S3
├── app.module.ts                # Корневой модуль
└── main.ts                      # Точка входа
```
