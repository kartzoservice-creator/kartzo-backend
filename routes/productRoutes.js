const express = require('express');
const router = express.Router();
const Product = require('../models/Product.model');

// GET /api/products - Sabhi products database se fetch karna
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/products/:id - Ek specific product database se fetch karna
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product nahi mila' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/products/seed - Database ko sample products se bharne ke liye
router.post('/seed', async (req, res) => {
  try {
    // Niche di gayi line ko uncomment karein agar aap chahte hain ki har baar naye products add karne se pehle purane sabhi products delete ho jayein.
    // await Product.deleteMany({});

    const sampleProducts = [
      { name: 'Milk', description: '1L Amul Taaza milk', price: 60 },
      { name: 'Bread', description: 'Freshly baked brown bread', price: 50 },
      { name: 'Eggs', description: 'Farm-fresh dozen eggs', price: 2500 },
      { name: 'Butter', description: '500g salted butter', price: 250 },
      { name: 'Cheese', description: 'Cheddar cheese block', price: 300 },
      { name: 'Apples', description: '1kg fresh red apples', price: 150 },
      { name: 'Bananas', description: 'Half dozen bananas', price: 40 },
      { name: 'Chicken', description: '1kg boneless chicken', price: 400 },
      { name: 'Potatoes', description: '1kg fresh potatoes', price: 30 },
      { name: 'Onions', description: '1kg fresh onions', price: 45 },
      { name: 'Rice', description: '1kg Basmati rice', price: 120 },
      { name: 'Tomatoes', description: '1kg fresh tomatoes', price: 50 },
      { name: 'Cucumbers', description: '500g fresh cucumbers', price: 20 },
      { name: 'Yogurt', description: '500g plain yogurt', price: 70 },
      { name: 'Coffee', description: '250g ground coffee', price: 200 },
      { name: 'Tea', description: '100g black tea leaves', price: 100 },
      { name: 'Sugar', description: '1kg white sugar', price: 40 },
      { name: 'Salt', description: '1kg iodized salt', price: 20 },
      { name: 'Flour', description: '1kg wheat flour', price: 60 },
      { name: 'Oil', description: '1L refined sunflower oil', price: 150 },
      { name: 'Soap', description: 'Bathing soap bar', price: 30 }
    ];

    await Product.insertMany(sampleProducts);
    res.status(201).json({ message: 'Database mein naye sample products add ho gaye!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/products - Sabhi products delete karna
router.delete('/', async (req, res) => {
  try {
    await Product.deleteMany({});
    res.status(200).json({ message: 'All products deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/products - Naya product database mein add karna
router.post('/', async (req, res) => {
  const { name, description, price } = req.body;
  const newProduct = new Product({ name, description, price });

  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;