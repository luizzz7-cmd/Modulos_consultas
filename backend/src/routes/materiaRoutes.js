const express = require('express');
const router = express.Router();
const materiaController = require('../controllers/materiaController');

// Obtener todas las materias
router.get('/', materiaController.obtenerMaterias);

// Obtener una materia por ID
router.get('/:id', materiaController.obtenerMateriaPorId);

// Crear una nueva materia
router.post('/', materiaController.crearMateria);

// Actualizar una materia
router.put('/:id', materiaController.actualizarMateria);

// Eliminar una materia
router.delete('/:id', materiaController.eliminarMateria);

module.exports = router;
