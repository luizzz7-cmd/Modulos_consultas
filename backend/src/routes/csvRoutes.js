const express = require('express');
const router = express.Router();
const csvController = require('../controllers/csvController');
const upload = require('../middleware/uploadMiddleware');

// Importar horarios desde CSV
router.post('/importar', upload.single('archivo'), csvController.importarHorariosCSV);

// Obtener historial de importaciones
router.get('/historial', csvController.obtenerImportaciones);

// Descargar plantilla de CSV
router.get('/descargar-plantilla', csvController.descargarPlantillaCSV);

module.exports = router;
