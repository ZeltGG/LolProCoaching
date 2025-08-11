const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

const authRoutes = require('./routes/auth');
const sessionRoutes = require('./routes/sessions');

dotenv.config();

const app = express();

// ✅ Middleware CORS mejorado
app.use((req, res, next) => {
  const allowedOrigins = [
    'http://localhost:4200',
    'https://zeltgg.github.io',
    'http://3.142.96.45'
  ];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

app.use(express.json());

// ✅ Rutas API
app.use('/api/auth', authRoutes);
app.use('/api/sessions', sessionRoutes);

// ✅ SERVIR FRONTEND DESDE frontend (sin dist/browser)
const frontendPath = path.join(__dirname, '../frontend');
app.use(express.static(frontendPath));

// ✅ Redirección para rutas Angular (SPA)
app.get('*', (req, res, next) => {
  if (req.originalUrl.startsWith('/api/')) return next(); // deja pasar APIs
  if (req.originalUrl.includes('.')) return res.status(404).send('Archivo no encontrado');
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// ✅ Ruta raíz backend
app.get('/', (req, res) => {
  res.send('🚀 LoLProCoaching backend en línea y conectado a MongoDB Atlas');
});

// ✅ Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch(err => console.error('❌ Error conectando a MongoDB:', err));


// ✅ Exportar app para Jest
module.exports = app;