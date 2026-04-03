const express = require('express');
const router = express.Router();
const grupoController = require('../controllers/grupoController');

// Obtener todos los grupos
router.get('/', grupoController.obtenerGrupos);

// Obtener un grupo por ID
router.get('/:id', grupoController.obtenerGrupoPorId);

// Obtener horarios de un grupo
router.get('/:id/horarios', grupoController.obtenerHorariosGrupo);

// Crear un nuevo grupo
router.post('/', grupoController.crearGrupo);

// Actualizar un grupo
router.put('/:id', grupoController.actualizarGrupo);

// Eliminar un grupo
router.delete('/:id', grupoController.eliminarGrupo);

module.exports = router;
