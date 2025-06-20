# E-commerce Platform (Next.js + Express)

This project is a modern e-commerce platform with a Next.js frontend and an Express.js backend. It features a responsive product catalog, search/filter, product details, and admin API for managing products. The backend uses in-memory storage (no database required).

---

## Features
- Home page with app info
- Products page with search/filter and responsive grid
- Product details page
- Fetches product data from backend API
- Add, list, and delete products via API
- Attractive, mobile-friendly UI

---

## Prerequisites
- Node.js (v16 or higher recommended)

---

## Project Structure
```
/ (root)
  frontend/   # Next.js frontend (UI)
  backend/    # Express.js backend (API)
  README.md   # This file
```

---

## Setup Instructions

### 1. Clone the repository (if needed)

### 2. Backend Setup
```bash
cd backend
npm install
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

### 4. Add Product Images
- Place your product images (e.g. `headphones.jpg`, `smartwatch.jpg`, etc.) in the `frontend/public/` folder.
- The image filenames should match the `image` field in your backend product data.

---

## How to Run

### 1. Start the Backend API
```bash
cd backend
node server.js
```
- The API will be running at [http://localhost:4000](http://localhost:4000)

### 2. Start the Frontend
```bash
cd frontend
npm run dev
```
- Open [http://localhost:3000](http://localhost:3000) in your browser.
- Visit `/products` to see the product list.

---

## API Endpoints (Backend)

### 1. Get All Products
- **GET** `/api/products`
- **Response:** Array of all products (JSON)

### 2. Get Product by ID
- **GET** `/api/products/:id`
- **Response:** Single product object (JSON)

### 3. Add a Product
- **POST** `/api/products`
- **Body (JSON):**
  ```json
  {
    "name": "Product Name",
    "price": 1234,
    "image": "/yourimage.jpg",
    "category": "Category",
    "description": "Full product description here."
  }
  ```
- **Response:** The created product (JSON)

### 4. Delete a Product
- **DELETE** `/api/products/:id`
- **Response:** The deleted product (JSON)

---

## How to Add or Remove Products (Admin)
- Use API tools like [Postman](https://www.postman.com/) or `curl` to send POST/DELETE requests.
- Example to add a product:
  ```bash
  curl -X POST http://localhost:4000/api/products \
    -H "Content-Type: application/json" \
    -d '{"name":"New Product","price":999,"image":"/new.jpg","category":"Electronics","description":"A new product."}'
  ```
- Example to delete a product:
  ```bash
  curl -X DELETE http://localhost:4000/api/products/3
  ```

---

## Notes
- **Data is stored in-memory.** All products will reset when the backend server restarts.
- Images are served by the frontend. The `image` field should match a file in the frontend's `public/` folder.
- Make sure the backend is running before starting the frontend.
- You can change the backend URL in the frontend code if needed.

---

For any issues, please check that both backend and frontend servers are running and accessible at the correct URLs/ports. 