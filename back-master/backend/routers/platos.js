const express = require('express');
const router = express.Router();
const platosController = require('../controllers/dishController');

// Crear un nuevo plato
router.post('/', platosController.crearPlato);

// Obtener detalles de un plato por ID
router.get('/:id', platosController.obtenerPlato);

// Actualizar un plato
router.put('/:id', platosController.actualizarPlato);

// Eliminar un plato
router.delete('/:id', platosController.eliminarPlato);

// Obtener todos los clientes
router.get('/', platosController.obtenerPlatos); // Nueva ruta para obtener todos los clientes

module.exports = router;
