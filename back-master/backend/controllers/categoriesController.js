const Category = require('../models/Categories');

// Crear una nueva categoría
exports.crearCategoria = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;

        // Verificar si ya existe una categoría con el mismo nombre
        const categoriaExistente = await Category.findOne({ nombre });
        if (categoriaExistente) {
            return res.status(400).json({ message: 'La categoría ya existe' });
        }

        const categoria = new Category({ nombre, descripcion });
        await categoria.save();

        return res.status(201).json(categoria);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: 'Error al crear la categoría' });
    }
};

// Obtener todas las categorías
exports.obtenerCategorias = async (req, res) => {
    try {
        const categorias = await Category.find();
        return res.status(200).json(categorias);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: 'Error al obtener las categorías' });
    }
};

// Actualizar una categoría
exports.actualizarCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion } = req.body;

        const categoria = await Category.findByIdAndUpdate(id, { nombre, descripcion }, { new: true });
        if (!categoria) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }

        return res.status(200).json(categoria);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: 'Error al actualizar la categoría' });
    }
};

// Eliminar una categoría completamente (borrado total)
exports.eliminarCategoria = async (req, res) => {
    try {
        const { id } = req.params;

        // Eliminar la categoría de forma permanente
        const categoriaEliminada = await Category.findByIdAndDelete(id);
        
        if (!categoriaEliminada) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }

        return res.status(200).json({ message: 'Categoría eliminada exitosamente' });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Error al eliminar la categoría" });
    }
};
