const mongoose = require('mongoose');
require('dotenv').config(); // Para leer el archivo .env

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Conectado a MongoDB Atlas');
  } catch (err) {
    console.error('❌ Error de conexión:', err);
    process.exit(1); // Detiene la app si no logra conectar
  }
};

module.exports = connectDB;
