const express = require('express');
const router = express.Router();
const horarioController = require('../controllers/horarioController');

// Obtener todos los horarios
router.get('/', horarioController.obtenerHorarios);

// Consultar disponibilidad
router.get('/disponibilidad', horarioController.consultarDisponibilidad);

// Obtener un horario por ID
router.get('/:id', horarioController.obtenerHorarioPorId);

// Crear un nuevo horario
router.post('/', horarioController.crearHorario);

// Actualizar un horario
router.put('/:id', horarioController.actualizarHorario);

// Eliminar un horario
router.delete('/:id', horarioController.eliminarHorario);

module.exports = router;
