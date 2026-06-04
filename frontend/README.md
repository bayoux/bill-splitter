# Frontend

Vue 3 SPA для Bill Splitter. Два сценария использования: хост управляет меню, гость выбирает блюда.

## Запуск

```bash
# Dev сервер
pnpm dev

# Production сборка
pnpm build
pnpm preview  # предпросмотр сборки
```

## Переменные окружения

```bash
# .env
VITE_API_URL=http://localhost:3000
```

## Маршруты

| Путь      | Страница         | Описание                           |
| --------- | ---------------- | ---------------------------------- |
| `/`       | —                | Редирект на `/create`              |
| `/create` | `CreateDishPage` | Хост: управление меню и QR-кодом   |
| `/guest`  | `GuestPage`      | Гость: выбор блюд и итоговая сумма |

## Структура

```
src/
├── api/
│   └── instance.ts          # Axios с базовым URL из VITE_API_URL
├── assets/
│   ├── main.css             # Глобальные стили, шрифты, reset
│   └── themes.css           # CSS-переменные: светлая и тёмная тема
├── components/
│   ├── BaseButton.vue       # Кнопка: варианты primary/secondary/ghost/icon
│   ├── Footer.vue           # Панель действий хоста (копировать ссылку, сохранить)
│   ├── Header.vue           # Шапка с переключателем темы
│   └── QrUpload.vue         # Загрузка/просмотр/удаление QR-кода
├── composables/
│   ├── useDishes.ts         # CRUD блюд + валидация
│   ├── useEditDish.ts       # Состояние модалки редактирования
│   ├── useShareLink.ts      # Копирование ссылки гостя в буфер
│   └── useTheme.ts          # Тёмная/светлая тема с persist в localStorage
├── pages/
│   ├── CreateDishPage.vue   # Страница хоста
│   └── GuestPage.vue        # Страница гостя
├── router/
│   └── index.ts             # Vue Router конфигурация
├── stores/
│   └── qrCode.ts            # Pinia store для QR-кода
├── types/
│   └── dish.ts              # Интерфейс Dish
└── utils/
    └── formatSize.ts        # Форматирование размера файла (bytes → KB/MB)
```

## Стиль кода

Правила описаны в [CODESTYLE.md](../CODESTYLE.md):

- BEM-классы: `блок__элемент_модификатор`
- Порядок импортов: vue → external → `@/` → local
- API-запросы: `async/await` + `try/catch`
- Props и emits типизированы через интерфейсы
