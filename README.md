# Bill Splitter

Приложение для разделения счёта: хост добавляет блюда и загружает QR-код для оплаты, гости открывают ссылку, выбирают свои позиции и видят итоговую сумму.

## Стек

|              | Технология                                  |
| ------------ | ------------------------------------------- |
| **Backend**  | NestJS · TypeORM · PostgreSQL · AWS S3      |
| **Frontend** | Vue 3 · Pinia · Vue Router · Vite · SCSS    |
| **Tooling**  | pnpm workspaces · ESLint · Prettier · Husky |

## Структура монорепо

```
bill-splitter/
├── backend/          # NestJS REST API
├── frontend/         # Vue 3 SPA
├── docs/             # Дополнительная документация
├── CODESTYLE.md      # Гайд по стилю кода
├── tsconfig.base.json
└── package.json      # Корневые скрипты workspace
```

## Быстрый старт

### Требования

- Node.js 22+
- pnpm 9+
- PostgreSQL 14+
- AWS S3 bucket (для хранения QR-кодов)

### Установка

```bash
# 1. Клонировать репозиторий
git clone <repo-url>
cd bill-splitter

# 2. Установить зависимости
pnpm install

# 3. Настроить переменные окружения
cp backend/.env.example backend/.env
# Заполнить backend/.env своими значениями

# 4. Запустить
pnpm dev
```

### Переменные окружения

Все переменные описаны в [backend/.env.example](backend/.env.example).

| Переменная       | Описание                                 |
| ---------------- | ---------------------------------------- |
| `DB_*`           | Подключение к PostgreSQL                 |
| `AWS_*`          | Доступ к S3 для хранения QR              |
| `ALLOWED_ORIGIN` | CORS origin фронтенда                    |
| `PORT`           | Порт API (по умолчанию 3000)             |
| `NODE_ENV`       | Окружение (`development` / `production`) |

## Команды

Все команды запускаются из корня репозитория.

| Команда             | Описание                                 |
| ------------------- | ---------------------------------------- |
| `pnpm dev`          | Запустить frontend и backend параллельно |
| `pnpm dev:frontend` | Только frontend (Vite dev server)        |
| `pnpm dev:backend`  | Только backend (NestJS watch mode)       |
| `pnpm build`        | Production сборка обоих пакетов          |
| `pnpm typecheck`    | Проверка TypeScript типов                |
| `pnpm lint`         | ESLint по всему проекту                  |
| `pnpm format`       | Prettier — форматирование всех файлов    |
| `pnpm format:check` | Prettier — проверка без изменений        |
| `pnpm test`         | Запуск тестов                            |
| `pnpm clean`        | Удалить `dist/` и `coverage/`            |

## Архитектура

```
Браузер (хост)                 Браузер (гость)
     │                               │
     │  POST /qr-code                │  GET /dishes
     │  POST /dishes                 │  GET /qr-code
     ▼                               ▼
  NestJS API  ──── TypeORM ────  PostgreSQL
     │
     └──── AWS S3 (QR-изображения)
```

**Хост** (`/create`): добавляет блюда, загружает QR-код для оплаты, копирует ссылку гостя.

**Гость** (`/guest`): открывает ссылку, отмечает выбранные блюда, видит итоговую сумму и QR для оплаты.
