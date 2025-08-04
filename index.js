const express = require('express');
const path = require('path'); // Módulo para rutas absolutas
const {verificarToken} = require('./seguridad/auth')
const app = express();
const mongoose = require('mongoose'); // importamos la librería Mongoose

// URI de conexión a MongoDB (MongoDB Atlas en este caso). 
// Reemplaza <usuario>, <password> y <tuBase> por tus datos reales.
const mongoURI = 'mongodb+srv://2021208:123@cluster0.5elaz0b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Opciones recomendadas para evitar advertencias (según la versión de Mongoose)
const options = {
  useNewUrlParser: true,    // Usa el nuevo parser de URL Mongo
  useUnifiedTopology: true  // Usa el nuevo motor de manejo de topologías
};

// Conectarse a la base de datos:
mongoose.connect(mongoURI, options)
  .then(() => console.log('✅ Conectado a MongoDB Atlas'))   // Éxito en la conexión
  .catch(err => console.error('❌ Error de conexión:', err)); // Manejo de error
app.use(express.json()); // 🔁 Primero procesamos el cuerpo
const routes = require('./rutas/RutasUsuario');
const routesCamiseta = require('./rutas/RutasCamiseta');

app.use('/api/usuarios', routes); // Luego usamos las rutas
app.use('/api/camisetas', routesCamiseta); // Luego usamos las rutas

// Middleware para parsear JSON en las peticiones (body-parser integrado)
app.use(express.json());
//app.use(express.static(path.join(__dirname, 'public')));
app.get('/camiseta',verificarToken, (req,res) => {
  res.sendFile(path.join(__dirname, 'public', 'camiseta.html'));
});
app.get('/registro', (req,res) => {
  res.sendFile(path.join(__dirname, 'public', 'registro.html'));
});

app.get('/login', (req,res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor API escuchando en http://localhost:${PORT}`);
})