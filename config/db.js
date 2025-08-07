// db.js
const mongoose = require('mongoose'); // Importamos la librería Mongoose

// URI de conexión a MongoDB (reemplaza los datos según tu configuración)
const mongoURI = 'mongodb+srv://2021208:123@cluster0.5elaz0b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Opciones recomendadas para evitar advertencias (según la versión de Mongoose)
const options = {
  useNewUrlParser: true,    // Usa el nuevo parser de URL Mongo
  useUnifiedTopology: true  // Usa el nuevo motor de manejo de topologías
};

// Conectarse a la base de datos:
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, options);
    console.log('✅ Conectado a MongoDB Atlas');
  } catch (err) {
    console.error('❌ Error de conexión:', err);
  }
};
// Exportamos la función de conexión
module.exports = connectDB;

