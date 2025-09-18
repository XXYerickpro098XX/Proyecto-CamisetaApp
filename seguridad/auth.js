const jwt = require('jsonwebtoken');
require('dotenv').config();

function verificarToken(req, res, next) {
  // Buscar token en query o en headers
  const token = req.query.token || (req.headers["authorization"]?.split(' ')[1]);

  if (!token) {
    return res.status(403).json({ error: 'Token requerido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // ahora usa la env
    req.usuarioId = decoded.id;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Token inválido o expirado' });
  }
}

module.exports = { verificarToken };
