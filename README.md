# Shopping App (Proof of Concept)

A modern mock/fake shopping web application built with **React + TypeScript** for the frontend, and **Node.js + Express + SQLite** for the backend API. This functions as a basic, single-session product display and shopping cart proof-of-concept.

At its core, the frontend code leverages React components to build the user interface, with React Router DOM managing navigation between the Home and Shop pages. The React Context API is crucial for state management, specifically for the shopping cart; it allows cart data to be globally accessible to various components without prop-drilling, and useState hooks within the context manage the cart's items and quantities. When a user interacts with a product card, an event handler triggers a function from the cart context (like addToCart) to update the global cart state. TypeScript is integrated throughout, providing type safety and improving code readability and maintainability.Styling is handled via Tailwind CSS for a clean, minimalistic aesthetic.

The backend, an Express.js and TypeScript API, serves product data from a simple SQLite database. It primarily offers a /products endpoint to retrieve all available items.

In essence, the app provides the core functionality of Browse products and adding them to a temporary, non-persistent cart within a single browser session. It serves as a solid foundation but would require further development to implement features like persistent cart storage, a dedicated cart viewing/management page, a checkout process, or user-specific order history.

This is my take on the following The Odin Project's Full Stack/React assignment: https://www.theodinproject.com/lessons/node-path-react-new-shopping-cart. I added Typescript and a bit of backend (Node JS + Express & SQLite) 

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
- TypeScript for backend code and type safety 
- CORS configured to allow frontend URL, enabled for cross-origin requests  
- ts-node-dev for development hot-reloading during local development 

---

## Folder Structure

```
Directory structure:
└── shopping-app/
     ├── Dockerfile
     ├── README.md
     └── apps/
          ├── backend/
          │    ├── Dockerfile
          │    ├── package-lock.json
          │    ├── package.json
          │    ├── src/
          │    │    ├── db/
          │    │    │    └── database.ts
          │    │    ├── routes/
          │    │    │    └── products.ts
          │    │    └── server.ts
          │    └── tsconfig.json
          └── frontend/
               ├── index.html
               ├── package-lock.json
               ├── package.json
               ├── public/
               │    ├── _redirects
               │    ├── assets/
               │    │    └── video.mp4
               │    └── vite.svg
               ├── src/
               │    ├── App.tsx
               │    ├── assets/
               │    │    └── react.svg
               │    ├── components/
               │    │    ├── NavBar.tsx
               │    │    ├── ProductCard.tsx
               │    │    └── __tests__/
               │    │         ├── NavBar.test.tsx
               │    │         └── ProductCard.test.tsx
               │    ├── context/
               │    │    ├── CartContext.tsx
               │    │    └── __tests__/
               │    │         └── CartContext.test.tsx
               │    ├── index.css
               │    ├── main.tsx
               │    ├── pages/
               │    │    ├── HomePage.tsx
               │    │    ├── ShopPage.tsx
               │    │    └── __tests__/
               │    │         ├── HomePage.test.tsx
               │    │         └── ShopPage.test.tsx
               │    ├── setupTests.ts
               │    ├── types/
               │    │    └── index.ts
               │    └── vite-env.d.ts
               ├── tsconfig.json
               └── vite.config.ts
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
- Uses Vite for building, and references environment variables prefixed with VITE_
- Environment variable VITE_BACKEND_URL must be set in the Netlify UI (not just .env)

⚠️ Make sure no trailing slash is present to avoid issues like double slashes in API URLs

- Custom rewrite rule to support SPA routing:

```
/*    /index.html   200
```

- **LIVE URL:** https://mock-shopping-app.netlify.app/

### Backend

- Deployed on Koyeb.
- Exposes product routes at /products
- Ensure environment variable `PORT` is set by Koyeb or defaults to 4000.
- SQLite DB file (`shopping.db`) included or initialized on start.
- CORS must be configured to allow requests from the Netlify frontend:

```
app.use(cors({
  origin: "https://mock-shopping-app.netlify.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
```

- **LIVE URL:** https://unwilling-arluene-oruizramos-b92e1586.koyeb.app/

# Deployment Tips

- After changing .env values (especially in the frontend), trigger a rebuild/redeploy on Netlify manually to apply changes

- Use console.log(import.meta.env.VITE_BACKEND_URL) inside components (during local dev) to verify the environment variable was correctly picked up

- If you see double slashes (//products) in requests, double-check:

- .env has no trailing slash

- Code uses template strings like `${VITE_BACKEND_URL}/products` instead of concatenation
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


## (Potential) Future Enhancements

- Cart Persistence: Implement local storage or session storage to retain cart items between sessions or page reloads. This ensures users don't lose their cart contents unexpectedly.

- Cart Page or Modal: Develop a dedicated cart page or modal that displays all items in the cart, allowing users to review and manage their selections before proceeding to checkout.

- Quantity Management: Allow users to adjust the quantity of items directly within the cart, providing flexibility to modify their orders without navigating back to product pages.

- Remove Items from Cart: Provide functionality to remove individual items from the cart, giving users control over their selections.

- Checkout Process: Implement a checkout workflow that captures user information, processes payments, and confirms orders. This could include integrating with payment gateways like Stripe or PayPal.

- Order History: Create a user account system where customers can view their past orders, enhancing user engagement and trust.

- Responsive Design Enhancements: Ensure that the cart and checkout components are fully responsive, providing a seamless experience across all devices.

- Unit and Integration Tests: Expand test coverage to include cart functionalities, ensuring reliability and facilitating future development.

---

## License

This project is licensed under the MIT License.

---

## Contact

omarruizramos@gmail.com

---