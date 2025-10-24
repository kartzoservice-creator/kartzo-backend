const mongoose = require('mongoose');

// User ka schema (structure) define karo
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Yeh field zaroori hai
    trim: true      // Extra spaces automatically remove honge
  },
  email: {
    type: String,
    required: true,
    unique: true,   // Same email dobara nahi ho sakti
    lowercase: true // Email hamesha lowercase mein save hogi
  },
  age: {
    type: Number,
    min: 0 // Age kabhi negative nahi ho sakti
  },
  createdAt: {
    type: Date,
    default: Date.now // Automatic current time set hoga
  }
});

// Model banayo
const User = mongoose.model('User', userSchema);

// Export karo taaki dusri files use kar sakein
module.exports = User;