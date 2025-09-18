const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const { verificarToken } = require('./seguridad/auth');
require('dotenv').config();

const app = express();

// Conexión a MongoDB
connectDB();

// Middleware para parsear JSON
app.use(express.json());

// Rutas API
const routes = require('./rutas/RutasUsuario');
const routesCamiseta = require('./rutas/RutasCamiseta');

app.use('/api/usuarios', routes);
app.use('/api/camisetas', routesCamiseta);

// Rutas públicas con archivos HTML
app.get('/camiseta', verificarToken, (req,res) => {
  res.sendFile(path.join(__dirname, 'public', 'camiseta.html'));
});

app.get('/registro', (req,res) => {
  res.sendFile(path.join(__dirname, 'public', 'registro.html'));
});

app.get('/login', (req,res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor API escuchando en http://localhost:${PORT}`);
});
