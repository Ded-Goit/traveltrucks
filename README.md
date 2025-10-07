# 🚐 Project TravelTrucks

## 📖 Про проєкт

TravelTrucks — це вебзастосунок для оренди кемперів і будинків на колесах.
Проєкт створений для компанії, що надає послуги оренди транспорту для подорожей Україною та Європою.

Мета проєкту — надати користувачам простий і сучасний спосіб:

🔎 переглядати каталог кемперів із фото, описом і характеристиками;

🧭 фільтрувати транспорт за локацією, типом і зручностями;

💖 додавати улюблені кемпери до списку “Обране”;

📝 переглядати деталі, читати відгуки та залишати заявку на бронювання.

## 🛠 Використані технології

Next.js 15 (App Router) — сучасний React-фреймворк

TypeScript — типобезпечний код

Zustand — легкий і зрозумілий стейт-менеджер

Axios — робота з бекендом через HTTP-запити

CSS Modules / Styled Components — ізольована стилізація компонентів

React Hook Form + Yup — обробка форм і валідація

React Toastify / Notistack — сповіщення про успіх або помилки

Vercel — деплой фронтенду

## 🔗 API

Використовується готовий публічний бекенд MockAPI:
👉 https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers

Основні ендпоінти:

GET /campers — отримати всі кемпери (фільтрація на бекенді)

GET /campers/:id — отримати деталі конкретного кемпера

## 🚀 Запуск та розгортання

1. Клонування репозиторію

```
git clone https://github.com/Ded-Goit/traveltrucks

cd traveltrucks
```

2. Встановлення залежностей

```
npm install
```

3. Запуск у режимі розробки

```
npm run dev
```

Застосунок буде доступний за адресою:
👉 http://localhost:3000

4. Збірка для продакшну

```
npm run build
npm run start
```

## 📂 Структура проєкту

```
📦 traveltrucks
┣ 📂 public — статичні ресурси (зображення, іконки, логотипи)
┣ 📂 src
┃ ┣ 📂 app — сторінки (Next.js App Router)
┃ ┃ ┣ 📂 (home) — головна сторінка /
┃ ┃ ┣ 📂 catalog — каталог кемперів /catalog
┃ ┃ ┗ 📂 catalog/[id] — сторінка деталей /catalog/:id
┃ ┣ 📂 components — UI-компоненти (карточки, форма, фільтри)
┃ ┣ 📂 store — Zustand store (глобальний стан)
┃ ┣ 📂 api — Axios-запити до бекенду
┃ ┣ 📂 types — типи TypeScript
┃ ┗ 📂 styles — стилі та теми
┣ 📜 eslint.config.mjs — ESLint-конфігурація
┣ 📜 .prettierrc — конфігурація Prettier
┣ 📜 package.json — залежності
┣ 📜 tsconfig.json — конфігурація TypeScript
┗ 📜 README.md — документація
```

## 🧩 Основні сторінки

### 🏠 Home Page

Банер з CTA (“Find your perfect camper for the next adventure”)

Кнопка “View Now” → перенаправлення на сторінку /catalog

### 🚐 Catalog Page

Відображає список кемперів

Фільтри за:

📍 локацією

🚗 типом кузова

⚙️ зручностями (AC, kitchen, bathroom тощо)

Кнопка Load More для пагінації

Додавання до обраного (збереження у localStorage)

### 📋 Camper Details Page

Детальний опис, галерея зображень

Вкладки Features і Reviews

Форма бронювання з валідацією

Toast-повідомлення після успішної відправки

## 🧠 Zustand Store Overview

📍 Основна структура стану:

```
interface CamperStore {
  campers: Camper[];         // усі отримані кемпери
  filters: FiltersState;     // стан фільтрів (локація, тип, опції)
  favorites: string[];       // ID обраних кемперів
  loading: boolean;          // індикатор запитів
  error: string | null;      // повідомлення про помилки

  // Дії (actions)
  fetchCampers: (params?: FiltersState) => Promise<void>;
  fetchCamperById: (id: string) => Promise<Camper | null>;
  toggleFavorite: (id: string) => void;
  setFilters: (filters: FiltersState) => void;
  clearFilters: () => void;
}
```

## ⚙️ Основні принципи:

Дані кемперів зберігаються централізовано в Zustand

При зміні фільтрів — очищаються попередні результати

Обране (favorites) зберігається в localStorage

Axios-запити реалізовані у файлах /src/api/campers.ts

Використовується middleware persist() для збереження стану

## 📌 Основні вимоги

Фільтрація на бекенді (через query params)

Збереження обраних кемперів між сесіями

Формат ціни: 8000.00

Лоадери та обробка помилок під час запитів

Компонентна архітектура та принцип DRY

## 👨‍💻 Автор

Andrii Romanov (Ded-Goit)
🔗 https://www.linkedin.com/in/andrii-ded-romanov/

📬 Email: mgm.agro04@gmail.com

## 🚀 Деплой

### Проєкт розгорнутий на Vercel

👉 https://traveltrucks-theta.vercel.app/

#### Найпростіший спосіб розгорнути ваш додаток Next.js - це використовувати [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) від творців Next.js.

#### Перегляньте [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) для отримання додаткової інформації.

## ℹ️ Додаткова інформація

Використовується ESLint + Prettier для єдиного стилю коду

Підтримується Next.js 15 App Router

Проєкт готовий до подальшого масштабування (наприклад, додавання авторизації чи оплати)

### Щоб дізнатися більше про Next.js, перегляньте такі ресурси:

- [Next.js Documentation](https://nextjs.org/docs) - дізнайтеся про функції та API Next.js.
- [Learn Next.js](https://nextjs.org/learn) - інтерактивний посібник з Next.js.

#### Ви можете переглянути [the Next.js GitHub repository](https://github.com/vercel/next.js) - ваші відгуки та внески вітаються!

#### Перегляньте [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) для отримання додаткової інформації.
