# Shopping App

A modern shopping web application built with **React + TypeScript** for the frontend, and **Node.js + Express + SQLite** for the backend API.

---

## Table of Contents

- [Project Overview](#project-overview)  
- [Tech Stack](#tech-stack)  
- [Folder Structure](#folder-structure)  
- [Frontend](#frontend)  
- [Backend](#backend)  
- [Testing](#testing)  
- [Styling](#styling)  
- [Getting Started](#getting-started)  
- [Deployment](#deployment)  
- [API Reference](#api-reference)  
- [License](#license)  

---

## Project Overview

This app features:

- A **Home page** with a welcome message and static content.
- A **Shop page** displaying products fetched from the backend API.
- A **shopping cart** managed globally using React Context.
- Product cards with quantity selectors and "Add to Cart" buttons.
- Dynamic cart item count visible in the navigation bar.
- Backend REST API serving product data from a SQLite database.
  The initial sample product data used in the backend is based on FakeStore API (https://fakestoreapi.com/) product information and images.
- SPA routing using React Router.
- Styling via Tailwind CSS for a clean, minimalistic look.
- Tests for components and context logic using React Testing Library.

---

## Tech Stack

### Frontend

- React 18 + TypeScript  
- Vite build tool  
- React Router DOM for routing  
- React Context API for global cart state  
- Tailwind CSS for styling  
- React Testing Library & Jest for testing  

### Backend

- Node.js + Express 5  
- SQLite database for product storage  
- TypeScript for backend code  
- CORS enabled for cross-origin requests  
- ts-node-dev for development hot-reloading  

---

## Folder Structure

```
shopping-app/
├── README.md
├── apps/
│   ├── backend/
│   │   ├── src/
│   │   │   ├── db/
│   │   │   │   └── database.ts
│   │   │   ├── routes/
│   │   │   │   └── products.ts
│   │   │   └── server.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── frontend/
│       ├── src/
│       │   ├── components/
│       │   ├── context/
│       │   ├── pages/
│       │   ├── types/
│       │   ├── App.tsx
│       │   └── main.tsx
│       ├── public/
│       ├── package.json
│       ├── tsconfig.json
│       └── vite.config.ts
```

---

## Frontend

- **Routing:** `/` for HomePage, `/shop` for ShopPage.
- **NavBar:** Always visible, shows navigation links and cart item count.
- **HomePage:** Static welcome content.
- **ShopPage:** Fetches product data from backend API and displays a grid of ProductCard components.
- **ProductCard:** Shows product title, image, price, and quantity input with increment/decrement buttons. Allows adding specified quantity to cart.
- **CartContext:** Manages cart items state globally; provides `addToCart`, `removeFromCart`, `clearCart`.
- **State management:** React Context + useState hooks.
- **Styling:** Tailwind CSS classes for responsive, minimalistic design.

---

## Backend

- **SQLite DB:** Stores products table with sample product data inserted on first run.
- **API endpoint:**  
  `GET /products` returns all products as JSON.
- **Server:** Express with CORS and JSON middleware.
- **Startup:** DB initialized before server listens.
- **Port:** Defaults to 4000 (can be overridden by environment variable).

---

## Testing

- **React Testing Library:** Used for testing React components and context.
- **Tests cover:**  
  - Rendering of NavBar, ProductCard, HomePage, ShopPage.  
  - Interaction with quantity inputs and buttons.  
  - CartContext state updates upon adding/removing items.
- Tests located alongside components and context in `__tests__` folders.

---

## Styling

- Tailwind CSS configured via Vite plugin.
- Utility-first approach for rapid styling.
- Modern minimalistic look inspired by top 2024 online storefronts.
- Responsive layout for mobile and desktop.

---

## Getting Started

### Prerequisites

- Node.js v18+  
- npm or yarn  

### Setup Backend

```bash
cd apps/backend
npm install
npm run dev
```

The backend runs on `http://localhost:4000`.

### Setup Frontend

```bash
cd apps/frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:3000` (default Vite port).

---

## Deployment

### Frontend

- Deployed on Netlify  


```
/*    /index.html   200
```



- **Netlify URL:** 

### Backend

- Deployed on .
- Ensure environment variable `PORT` is set or defaults to 4000.
- SQLite DB file (`shopping.db`) included or initialized on start.
- **Backend URL:** 
---

## API Reference

- **GET /products**  
  Returns JSON array of product objects:

```json
[
  {
    "id": 1,
    "title": "Sample Product 1",
    "price": 29.99,
    "description": "A great product",
    "category": "electronics",
    "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
  },
  ...
]
```

---

## License

This project is licensed under the MIT License.

---

## Contact

omarruizramos@gmail.com

---