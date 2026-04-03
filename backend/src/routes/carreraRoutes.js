const express = require('express');
const router = express.Router();
const carreraController = require('../controllers/carreraController');

// Obtener todas las carreras
router.get('/', carreraController.obtenerCarreras);

// Obtener una carrera por ID
router.get('/:id', carreraController.obtenerCarreraPorId);

// Obtener espacios ocupados por una carrera
router.get('/:id/espacios', carreraController.obtenerEspaciosCarrera);

// Crear una nueva carrera
router.post('/', carreraController.crearCarrera);

// Actualizar una carrera
router.put('/:id', carreraController.actualizarCarrera);

// Eliminar una carrera
router.delete('/:id', carreraController.eliminarCarrera);

module.exports = router;
