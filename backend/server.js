const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// In-memory product array
let products = [
  {
    id: 1,
    name: 'Wireless Headphones',
    category: 'Electronics',
    price: 2999,
    image: '/headphones.jpg',
    description: 'High-quality wireless headphones with noise cancellation.'
  },
  {
    id: 2,
    name: 'Smart Watch',
    category: 'Electronics',
    price: 4999,
    image: '/smartwatch.jpg',
    description: 'Track your fitness and notifications on the go.'
  },
  {
    id: 3,
    name: 'Running Shoes',
    category: 'Footwear',
    price: 1999,
    image: '/shoes.jpg',
    description: 'Comfortable and stylish running shoes for all terrains.'
  },
  {
    id: 4,
    name: 'Backpack',
    category: 'Accessories',
    price: 1499,
    image: '/backpack.jpg',
    description: 'Durable backpack for travel and daily use.'
  },
  {
    id: 5,
    name: 'Bluetooth Speaker',
    category: 'Electronics',
    price: 2499,
    image: '/speaker.jpg',
    description: 'Portable speaker with deep bass and long battery life.'
  },
];

// GET /api/products - List all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// GET /api/products/:id - Get a single product by ID
app.get('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});

// POST /api/products - Add a new product
app.post('/api/products', (req, res) => {
  const { name, price, image, category, description } = req.body;
  if (!name || !price || !image || !category) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const newProduct = {
    id: products.length ? products[products.length - 1].id + 1 : 1,
    name,
    price,
    image,
    category,
    description: description || '',
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// DELETE /api/products/:id - Delete a product by ID
app.delete('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }
  const deleted = products.splice(index, 1);
  res.json(deleted[0]);
});

app.listen(PORT, () => {
  console.log(`Backend API server running on http://localhost:${PORT}`);
}); 