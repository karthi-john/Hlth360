const mongoose = require('mongoose');

const healthcareProductSchema = new mongoose.Schema({
  name: { type: String, required: true },         
  category: { type: String, required: true },     
  manufacturer: { type: String },                  
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 }               
});

module.exports = mongoose.model('HealthcareProduct', healthcareProductSchema);
