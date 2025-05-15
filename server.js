const express = require("express");
const connectDB = require('./config/db');
const patientRoutes = require('./routes/patientRoutes');
const healthcareProductRoutes = require('./routes/healthcareProductRoutes');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();
const morgan = require("morgan");
const authMiddleware = require("./middlewares/authMiddleware");


const app = express();
const PORT = process.env.PORT;


connectDB();

app.use(express.json());
app.use(morgan('dev'));


app.use('/api/auth', authRoutes);

app.use(authMiddleware);

app.use('/api/patients', patientRoutes);
app.use('/api/product', healthcareProductRoutes);


app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the hlth360 API',
    endpoints: {
      getPatients: 'GET /api/patients',
      getPatientById: 'GET /api/patients/:id',
      createPatient: 'POST /api/patients',
      updatePatient: 'PUT /api/patients/:id',
      deletePatient: 'DELETE /api/patients/:id'
    }
  });
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'Something went wrong on the server'
  });
});


app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});