const Dish = require('../models/Dish');

// Crear un nuevo plato
const crearPlato = async (req, res) => {
    try {
        const { nombre, ingredientes, precio } = req.body;
        const nuevoPlato = new Dish({
            nombre,
            ingredientes,
            precio
        });
        await nuevoPlato.save();
        res.status(201).json({ message: 'Plato creado exitosamente', plato: nuevoPlato });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener detalles de un plato por ID
const obtenerPlato = async (req, res) => {
    try {
        const plato = await Dish.findById(req.params.id);
        if (!plato) {
            return res.status(404).json({ message: 'Plato no encontrado' });
        }
        res.status(200).json(plato);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un plato
const actualizarPlato = async (req, res) => {
    try {
        const { nombre, ingredientes, precio } = req.body;
        const plato = await Dish.findByIdAndUpdate(
            req.params.id,
            { nombre, ingredientes, precio },
            { new: true }
        );
        if (!plato) {
            return res.status(404).json({ message: 'Plato no encontrado' });
        }
        res.status(200).json({ message: 'Plato actualizado exitosamente', plato });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un plato
const eliminarPlato = async (req, res) => {
    try {
        const plato = await Dish.findByIdAndDelete(req.params.id);
        if (!plato) {
            return res.status(404).json({ message: 'Plato no encontrado' });
        }
        res.status(200).json({ message: 'Plato eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener todos los platos
const obtenerPlatos = async (req, res) => {
    try {
        const platos = await Dish.find();  // Obtener todos los platos
        return res.status(200).json(platos);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Error al obtener los platos" });
    }
};

module.exports = {
    obtenerPlatos,
    crearPlato,
    obtenerPlato,
    actualizarPlato,
    eliminarPlato
};
