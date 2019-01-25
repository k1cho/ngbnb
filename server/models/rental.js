const mongoose = require('mongoose');

const rentalSchema = mongoose.Schema({
  title: { type: String, required: true, max: [128, 'Title too long, max number of characters is 128'] },
  city: { type: String, required: true, lowercase: true },
  street: { type: String, required: true, min: [4, 'Address too short, min number of characters is 4'] },
  category: { type: String, required: true, lowercase: true },
  bedrooms: { type: Number },
  description: { type: String, required: true },
  image: { type: String, required: true },
  shared: { type: Boolean, required: true },
  price: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Rental', rentalSchema);
