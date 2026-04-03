require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

// Importar rutas
const horarioRoutes = require('./routes/horarioRoutes');
const espacioRoutes = require('./routes/espacioRoutes');
const profesorRoutes = require('./routes/profesorRoutes');
const materiaRoutes = require('./routes/materiaRoutes');
const grupoRoutes = require('./routes/grupoRoutes');
const carreraRoutes = require('./routes/carreraRoutes');
const csvRoutes = require('./routes/csvRoutes');

// Inicializar Express
const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos de uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Rutas de API
app.use('/api/horarios', horarioRoutes);
app.use('/api/espacios', espacioRoutes);
app.use('/api/profesores', profesorRoutes);
app.use('/api/materias', materiaRoutes);
app.use('/api/grupos', grupoRoutes);
app.use('/api/carreras', carreraRoutes);
app.use('/api/csv', csvRoutes);

// Ruta raíz
app.get('/api', (req, res) => {
  res.json({
    mensaje: 'API de Consulta de Horarios Académicos',
    version: '1.0.0',
    endpoints: {
      horarios: '/api/horarios',
      espacios: '/api/espacios',
      profesores: '/api/profesores',
      materias: '/api/materias',
      grupos: '/api/grupos',
      carreras: '/api/carreras',
      csv: '/api/csv',
    },
  });
});

// Manejo de errores general
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Error interno del servidor',
    mensaje: err.message,
  });
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Servidor ejecutándose en http://localhost:${PORT}`);
  console.log(`📝 API disponible en http://localhost:${PORT}/api`);
});
