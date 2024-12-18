const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');

// Crear una nueva categoría
router.post('/', categoriesController.crearCategoria);

// Obtener todas las categorías
router.get('/', categoriesController.obtenerCategorias);

// Actualizar una categoría por ID
router.put('/:id', categoriesController.actualizarCategoria);

// Eliminar una categoría (lógica) por ID
router.delete('/:id', categoriesController.eliminarCategoria);

module.exports = router;
