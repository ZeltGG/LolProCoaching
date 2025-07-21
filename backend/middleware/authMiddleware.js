const jwt = require('jsonwebtoken');
require('dotenv').config(); // Asegura que se cargue .env en todos los entornos

module.exports = function (req, res, next) {
  const authHeader = req.get('Authorization');

  console.log('🛡️ Authorization header recibido:', authHeader);

  // Asegurarse que sea formato "Bearer token"
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'Sin token o formato inválido' });
  }

  const token = authHeader.split(' ')[1];

  console.log('🔐 Token extraído:', token);
  console.log('🧪 JWT_SECRET usado:', process.env.JWT_SECRET);

  if (!token) {
    return res.status(401).json({ msg: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('❌ Error al verificar el token:', err.message);
    return res.status(401).json({ msg: 'Token inválido' });
  }
};