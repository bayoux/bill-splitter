# Гайд по коду — NestJS / TypeScript

> Рекомендации для единообразного стиля в backend части проекта.

---

## 📁 Именование файлов

kebab-case с суффиксом роли:

```
dishes.service.ts
dishes.controller.ts
dishes.module.ts
dish.entity.ts          # entity — единственное число
create-dish.dto.ts
update-dish.dto.ts
```

---

## 🏷️ Именование классов и методов

- **Классы** — PascalCase с суффиксом роли: `DishesService`, `DishesController`, `DishesModule`
- **Entity** — PascalCase без суффикса: `Dish`, `QrCode`
- **DTO** — PascalCase с суффиксом: `CreateDishDto`, `UpdateDishDto`
- **Методы** — camelCase, глагол + существительное: `findAll`, `findOne`, `uploadQr`
- **Методы контроллера** — REST-глагол: `getAll`, `getOne`, `create`, `update`, `delete`

---

## 📦 Порядок импортов

NestJS → внешние библиотеки → локальные файлы.

```ts
// ✅
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dish } from './dish.entity';
import { CreateDishDto } from './dto/create-dish.dto';

// ❌ — локальные файлы перед внешними
import { Dish } from './dish.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
```

---

## 🔷 Явные типы возвращаемых значений

Всегда указывай return type у методов сервисов и контроллеров.

```ts
// ✅
async findAll(): Promise<Dish[]> { ... }
async delete(id: number): Promise<void> { ... }

// ❌
async findAll() { ... }
async delete(id: number) { ... }
```

---

## 📋 DTO и валидация

Все входные данные проходят через DTO с декораторами `class-validator`. Никакой валидации вручную в сервисе.

```ts
// ✅
export class CreateDishDto {
  @IsString()
  @IsNotEmpty({ message: 'Название не может быть пустым' })
  @MaxLength(255)
  name!: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Transform(({ value }) => Number(value))
  @IsPositive()
  price!: number;
}

// ❌ — валидация в сервисе
async create(name: string, price: number) {
  if (!name) throw new Error('name is required');
  ...
}
```

Для частичного обновления используй `PartialType`:

```ts
export class UpdateDishDto extends PartialType(CreateDishDto) {}
```

---

## ⚡ Исключения

Используй NestJS-исключения, не бросай `new Error()`.

```ts
// ✅
throw new NotFoundException(`Dish ${id} not found`);
throw new BadRequestException('File is required');

// ❌
throw new Error('not found');
```

---

## 🔄 Async / await

Всегда `async/await`, без `.then()`.

```ts
// ✅
async findAll(): Promise<Dish[]> {
  return await this.dishRepository.find();
}

// ❌
findAll() {
  return this.dishRepository.find().then(data => data);
}
```

---

## 🎛️ Порядок декораторов в контроллере

HTTP-метод → HttpCode → UseInterceptors → параметры.

```ts
// ✅
@Post()
@HttpCode(HttpStatus.CREATED)
@UseInterceptors(AnyFilesInterceptor())
create(@Body() dto: CreateDishDto): Promise<Dish> { ... }
```

---

## ✅ Быстрая проверка перед PR

- [ ] Файлы в kebab-case с суффиксом роли
- [ ] Return types указаны на всех методах сервисов и контроллеров
- [ ] Входные данные валидируются через DTO
- [ ] Используются NestJS-исключения
- [ ] Порядок импортов: NestJS → external → local
- [ ] Только `async/await`, без `.then()`
