# Гайд по коду — Vue 3 / TypeScript

> Это не строгие правила, а рекомендации. Заглядывай сюда пока пишешь код.

---

## 🏷️ Называй классы через дефис (kebab-case / BEM)

Все CSS-классы — строчными буквами через дефис. Структура: `блок__элемент_модификатор`.

- Элемент: `__` (двойное подчёркивание)
- Модификатор: `_` (одиночное подчёркивание)

```html
<!-- ✅ -->
<div class="user-card">
  <div class="user-card__title">...</div>
  <div class="user-card__title_active">...</div>
</div>

<!-- ❌ -->
<div class="userCard">
  <div class="UserCardTitle">...</div>
  <div class="user-card__title--active">...</div>
</div>
```

---

## ⚡ Запросы — async/await + try/catch

Каждый запрос к API оборачивай в `try/catch`. Всегда показывай пользователю, что что-то пошло не так.

```ts
// ✅
const loading = ref(false);
const error = ref<string | null>(null);

async function fetchUsers() {
  loading.value = true;
  try {
    users.value = await api.get('/users');
  } catch (e) {
    error.value = 'Не удалось загрузить данные';
  } finally {
    loading.value = false;
  }
}

// ❌
api.get('/users').then((data) => {
  users.value = data;
});
```

---

## 🎨 Стили — глобальное в main.css, остальное в компоненте

Цвета, шрифты и общие переменные — только в `main.css`. Стили конкретного компонента — в его `<style lang="scss">`.

```scss
/* main.css */
:root {
  --color-primary: #1d9e75;
}

/* MyComponent.vue */
.my-component {
  color: var(--color-primary); /* используй переменные, не хардкодь цвета */
}
```

---

## 🔷 TypeScript — типизируй props и emits

Описывай входные данные компонента через интерфейсы — это помогает и тебе, и тем кто будет читать код.

```ts
// ✅
interface IProps {
  userId: number;
  name: string;
  isActive?: boolean; // ? означает необязательное поле
}

interface IEmits {
  (event: 'save'): void;
  (event: 'delete', id: number): void;
}

const props = defineProps<IProps>();
const emit = defineEmits<IEmits>();
```

---

## 📦 Порядок импортов

Сначала Vue, потом внешние библиотеки, потом FSD-пути (`@/`), потом локальные (`./`).

```ts
// ✅
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import BaseButton from '@/components/BaseButton.vue';
import { useShareLink } from '@/composables/useShareLink';
import type { Dish } from './types';

// ❌ — внешние библиотеки стоят после @/ импортов
import BaseButton from '@/components/BaseButton.vue';
import { IconPlus } from '@tabler/icons-vue';
import { ref } from 'vue';
```

---

## 🔒 Секреты — в .env файл

Никогда не вставляй токены и ключи прямо в код. Клади их в `.env` и обращайся через `import.meta.env`.

```bash
# .env
VITE_API_URL=https://api.example.com
```

```ts
// ✅
fetch(import.meta.env.VITE_API_URL + '/users');

// ❌
fetch('https://api.example.com/users');
```

---

## 📚 Полезные ссылки

### Vue 3

- [Официальная документация Vue 3](https://vuejs.org/guide/introduction)
- [script setup — как использовать](https://vuejs.org/api/sfc-script-setup)
- [defineProps и defineEmits](https://vuejs.org/api/sfc-script-setup#defineprops-defineemits)
- [ref и reactive](https://vuejs.org/guide/essentials/reactivity-fundamentals)
- [watch и watchEffect](https://vuejs.org/guide/essentials/watchers)

### TypeScript

- [TypeScript за 5 минут](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
- [Интерфейсы и типы](https://www.typescriptlang.org/docs/handbook/2/objects.html)
- [TypeScript + Vue — официальный гайд](https://vuejs.org/guide/typescript/overview)

### SCSS и BEM

- [БЭМ — быстрый старт](https://bem.info/ru/methodology/quick-start/)
- [SCSS документация](https://sass-lang.com/documentation/)

### Общее

- [async/await — MDN](https://developer.mozilla.org/ru/docs/Learn/JavaScript/Asynchronous/Promises)
- [try/catch — MDN](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Statements/try...catch)
- [Переменные окружения в Vite](https://vite.dev/guide/env-and-mode)

---

## ✅ Быстрая проверка перед PR

- [ ] Классы в kebab-case, модификаторы через `_` (не `--`)
- [ ] Все запросы в `async/await` с `try/catch`
- [ ] Глобальные стили только в `main.css`
- [ ] Props и emits типизированы
- [ ] Нет токенов и ключей прямо в коде
- [ ] Порядок импортов: vue → external → @/ → local
