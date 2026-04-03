const express = require('express');
const router = express.Router();
const profesorController = require('../controllers/profesorController');

// Obtener todos los profesores
router.get('/', profesorController.obtenerProfesores);

// Obtener un profesor por ID
router.get('/:id', profesorController.obtenerProfesorPorId);

// Obtener horarios de un profesor
router.get('/:id/horarios', profesorController.obtenerHorariosProfesor);

// Crear un nuevo profesor
router.post('/', profesorController.crearProfesor);

// Actualizar un profesor
router.put('/:id', profesorController.actualizarProfesor);

// Eliminar un profesor
router.delete('/:id', profesorController.eliminarProfesor);

module.exports = router;
