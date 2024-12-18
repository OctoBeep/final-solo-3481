// routers/camarero.js

const express = require('express');
const router = express.Router();
const waiterController = require('../controllers/waiterController');

// Ruta para crear un nuevo mesero
router.post('/crear', waiterController.crearMesero);

// Ruta para obtener todos los meseros
router.get('/', waiterController.obtenerMeseros);

// Ruta para obtener un mesero por ID
router.get('/:id', waiterController.obtenerMeseroPorId);

// Ruta para actualizar los datos de un mesero
router.put('/:id', waiterController.actualizarMesero);

// Ruta para eliminar un mesero (eliminación lógica)
router.delete('/:id', waiterController.eliminarMesero);

module.exports = router;
