# Разработка монорепозитория

## Структура

```
bill-splitter/
├── backend/    # NestJS + TypeORM + PostgreSQL
├── frontend/   # Vue 3 + Vite + TypeScript
├── package.json
└── pnpm-workspace.yaml
```

## Требования

- [Node.js](https://nodejs.org) ≥ 18
- [pnpm](https://pnpm.io) 9.15.0 — `npm install -g pnpm@9.15.0`

## Установка

```bash
pnpm install
```

Устанавливает зависимости во всех пакетах разом. Повторять при изменении любого `package.json`.

## Команды

Все команды запускаются из корня репозитория.

### Запуск в режиме разработки

```bash
pnpm dev
```

Запускает frontend (Vite на `http://localhost:5173`) и backend (NestJS на `http://localhost:3000`) параллельно в watch-режиме.

### Сборка

```bash
pnpm build
```

Собирает оба пакета. Frontend → `frontend/dist/`, backend → `backend/dist/`.

### Линтер

```bash
pnpm lint
```

Запускает ESLint в обоих пакетах. Backend линтует с флагом `--fix` (авто-исправление), frontend — без.

### Форматирование

```bash
pnpm format
```

Запускает Prettier по исходникам backend (`src/**/*.ts`, `test/**/*.ts`). Frontend использует только ESLint.

### Тесты

```bash
pnpm test
```

Запускает Jest в backend. Frontend тестов нет.

## Работа с конкретным пакетом

Если нужно запустить команду только в одном пакете:

```bash
# Только frontend
pnpm --filter frontend dev
pnpm --filter frontend build

# Только backend
pnpm --filter backend dev
pnpm --filter backend test:watch
pnpm --filter backend test:cov
pnpm --filter backend start:debug
```

Либо зайти в директорию и запустить команду напрямую:

```bash
cd frontend && pnpm dev
cd backend && pnpm start:prod
```

## Добавление зависимостей

```bash
# В конкретный пакет
pnpm --filter frontend add vue-router
pnpm --filter backend add @nestjs/jwt

# Dev-зависимость
pnpm --filter frontend add -D vitest

# В корень монорепо (инструменты для всего репо)
pnpm add -D -w husky
```

> Не запускайте `npm install` или `yarn` внутри пакетов — это создаст конфликтующий `package-lock.json` / `yarn.lock`.

## Backend — дополнительные команды

| Команда | Описание |
|---|---|
| `pnpm --filter backend start:prod` | Запуск продакшн-сборки |
| `pnpm --filter backend start:debug` | Watch-режим с отладчиком на порту 9229 |
| `pnpm --filter backend test:watch` | Jest в watch-режиме |
| `pnpm --filter backend test:cov` | Jest с покрытием кода |
| `pnpm --filter backend test:e2e` | E2E-тесты |
