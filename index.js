const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Naye routes import karo
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mera-database');

mongoose.connection.on('connected', () => {
  console.log('MongoDB se connect ho gaya!');
});

// Routes use karo
app.use('/api/users', userRoutes); // Saari user routes /api/users se start hongi
app.use('/api/products', productRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('Namaste! Mera backend server kaam kar raha hai! 🎉');
});

// Start server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server chal gaya hai http://0.0.0.0:${port} par`);
});