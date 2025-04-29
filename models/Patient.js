const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },                           
  age: { type: Number, required: true },                            
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },      
  contactNumber: { type: String },                                   
  prescribedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'HealthcareProduct' }] 
});

module.exports = mongoose.model('Patient', patientSchema);
