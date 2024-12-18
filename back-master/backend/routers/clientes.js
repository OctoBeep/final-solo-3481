const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

// Registrar un nuevo cliente
router.post('/', clientController.registrarCliente);

// Obtener la información de un cliente por ID
router.get('/:id', clientController.obtenerClientePorId);

// Actualizar la información de un cliente por ID
router.put('/:id', clientController.actualizarCliente);

// Eliminar un cliente de forma total por ID
router.delete('/:id', clientController.eliminarCliente);

// Obtener todos los clientes
router.get('/', clientController.obtenerClientes); // Nueva ruta para obtener todos los clientes


module.exports = router;
