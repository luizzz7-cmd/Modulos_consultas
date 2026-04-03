const express = require('express');
const router = express.Router();
const espacioController = require('../controllers/espacioController');

// Obtener todos los espacios
router.get('/', espacioController.obtenerEspacios);

// Obtener un espacio por ID
router.get('/:id', espacioController.obtenerEspacioPorId);

// Crear un nuevo espacio
router.post('/', espacioController.crearEspacio);

// Actualizar un espacio
router.put('/:id', espacioController.actualizarEspacio);

// Eliminar un espacio
router.delete('/:id', espacioController.eliminarEspacio);

module.exports = router;
