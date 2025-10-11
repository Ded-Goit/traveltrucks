# 🚐 Project TravelTrucks

This is the main README in English.

For Ukrainian version, see [README.ua.md](README.ua.md)

## 📖 About the Project

TravelTrucks is a web application for renting campers and motorhomes.
The project is designed for a company providing vehicle rental services for trips across Ukraine and Europe.

The goal of the project is to give users a simple and modern way to:

🔎 Browse a catalog of campers with photos, descriptions, and specifications.

🧭 Filter vehicles by location, type, and amenities.

💖 Add favorite campers to a “Favorites” list.

📝 View detailed information, read reviews, and submit booking requests.

## 🛠 Technologies Used

Next.js 15 (App Router) — modern React framework

TypeScript — type-safe code

Zustand — lightweight state management

Axios — HTTP requests to backend

CSS Modules / Styled Components — scoped component styling

React Hook Form + Yup — forms and validation

React Toastify / Notistack — success and error notifications

Vercel — frontend deployment

## 🔗 API

A public MockAPI backend is used:
👉 https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers

Main endpoints:

GET /campers — get all campers (backend supports filtering)

GET /campers/:id — get details of a specific camper

## 🚀 Installation & Deployment

1. Clone the repository:

```
git clone https://github.com/Ded-Goit/traveltrucks
cd traveltrucks
```

2. Install dependencies:

```
npm install
```

3. Run in development mode:

```
npm run dev
```

The app will be available at:
👉 http://localhost:3000

4. Build for production:

```
npm run build
npm run start
```

## 📂 Project Structure

```
📦 traveltrucks
┣ 📂 public — static assets (images, icons, logos)
┣ 📂 src
┃ ┣ 📂 api — Axios requests to backend
┃ ┣ 📂 app — pages (Next.js App Router)
┃ ┃ ┗ 📂 catalog — camper catalog /catalog
┃ ┃   ┗ 📂 catalog/[id] — camper details /catalog/:id
┃ ┣ 📂 components — UI components (cards, forms, filters)
┃ ┣ 📂 constants — constants
┃ ┣ 📂 store — Zustand global state
┃ ┣ 📂 types — TypeScript types
┃ ┗ 📂 utils — utility functions
┣ 📜 .prettierrc — Prettier config
┣ 📜 eslint.config.mjs — ESLint config
┣ 📜 next.config.ts — Next.js config (TypeScript)
┣ 📜 package-lock.json
┣ 📜 package.json — dependencies
┣ 📜 README.md — project documentation
┗ 📜 tsconfig.json — TypeScript config
```

## 🧩 Main Pages

### 🏠 Home Page

Banner with CTA (“Find your perfect camper for the next adventure”)

“View Now” button → redirects to /catalog

### 🚐 Catalog Page

Displays a list of campers

Filters by:

📍 Location

🚗 Vehicle type

⚙️ Amenities (AC, kitchen, bathroom, etc.)

Load More button for pagination

Add to favorites (stored in localStorage)

### 📋 Camper Details Page

Detailed description, image gallery

Tabs: Features and Reviews

Booking form with validation

Notifications after successful submission

## 🧠 Zustand Store Overview

📍 State structure:

```
interface CamperStore {
  campers: Camper[];            // all campers
  selectedCamper: Camper | null;// current camper for details page
  favorites: string[];          // favorite camper IDs
  filters: CamperFilters;       // filter state (location, type, options)
  page: number;                 // current page number
  total: number;                // total number of campers
  loading: boolean;             // request loading indicator
  error: string | null;         // error message

  // Actions
  fetchCampers: (reset?: boolean) => Promise<void>; // fetch campers (with optional reset)
  fetchCamperById: (id: string) => Promise<void>;   // fetch a specific camper
  setFilters: (filters: CamperFilters) => void;    // update filters
  toggleFavorite: (id: string) => void;            // add/remove favorite
  clearFilters: () => void;                         // reset all filters
  loadMore: () => Promise<void>;                    // load next page
  clearError: () => void;                           // clear error messages
}
```

## ⚙️ Key Principles

Camper data is centralized in Zustand

Changing filters clears previous results

Favorites are persisted in localStorage

Axios requests are implemented in /src/api/campers.ts

persist() middleware is used to save state

## 📌 Requirements

Backend filtering via query params

Favorites persist between sessions

Price format: 8000.00

Loaders and error handling during requests

Component-based architecture, DRY principle

## 👨‍💻 Author

Andrii Romanov (DED)
🔗 LinkedIn

📬 Email: mgm.agro04@gmail.com

## 🚀 Deployment

### Project is deployed on Vercel

👉 https://traveltrucks-theta.vercel.app/

#### The easiest way to deploy a Next.js app is using [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) by the creators of Next.js.

#### For more details, check [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## ℹ️ Additional Information

ESLint + Prettier for consistent code style

Supports Next.js 15 App Router

Project is ready for further scaling (e.g., adding authentication or payments)

Learn more about Next.js:

Next.js Documentation

Learn Next.js

#### You can also explore [the Next.js GitHub repository](https://github.com/vercel/next.js) — feedback and contributions are welcome!

#### See [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more info.
