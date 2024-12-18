const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');

// Crear una nueva orden
router.post('/', ordersController.crearOrden);

// Obtener los detalles de una orden por ID
router.get('/:id', ordersController.obtenerOrdenPorId);

// Actualizar el estado de una orden por ID
router.put('/:id', ordersController.actualizarEstadoOrden);

// Eliminar una orden por ID
router.delete('/:id', ordersController.eliminarOrden);

// Obtener todos los clientes
router.get('/', ordersController.obtenerOrdenes); // Nueva ruta para obtener todos los clientes

module.exports = router;
