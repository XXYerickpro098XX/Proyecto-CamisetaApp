const express = require('express');
const connectDB = require('./config/db');
const path = require('path'); // Módulo para rutas absolutas
const {verificarToken} = require('./seguridad/auth')
const app = express();
connectDB();
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