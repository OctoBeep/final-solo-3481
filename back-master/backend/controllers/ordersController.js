const Orders = require('../models/Orders');

// Crear una nueva orden
const crearOrden = async (req, res) => {
    try {
        const { platos } = req.body;
        const nuevaOrden = new Orders({ platos });
        const ordenGuardada = await nuevaOrden.save();
        res.status(201).json({ mensaje: 'Orden creada exitosamente', orden: ordenGuardada });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear la orden', error: error.message });
    }
};

// Obtener detalles de una orden por ID
const obtenerOrdenPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const orden = await Orders.findById(id);
        if (!orden) {
            return res.status(404).json({ mensaje: 'Orden no encontrada' });
        }
        res.status(200).json(orden);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener la orden', error: error.message });
    }
};

// Actualizar el estado de una orden
const actualizarEstadoOrden = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;
        const ordenActualizada = await Orders.findByIdAndUpdate(
            id,
            { estado },
            { new: true }
        );
        if (!ordenActualizada) {
            return res.status(404).json({ mensaje: 'Orden no encontrada' });
        }
        res.status(200).json({ mensaje: 'Estado actualizado exitosamente', orden: ordenActualizada });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar el estado', error: error.message });
    }
};

// Eliminar una orden
const eliminarOrden = async (req, res) => {
    try {
        const { id } = req.params;
        const ordenEliminada = await Orders.findByIdAndDelete(id);
        if (!ordenEliminada) {
            return res.status(404).json({ mensaje: 'Orden no encontrada' });
        }
        res.status(200).json({ mensaje: 'Orden eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar la orden', error: error.message });
    }
};

// Obtener todas las órdenes
const obtenerOrdenes = async (req, res) => {
    try {
        const ordenes = await Orders.find();  // Obtener todas las órdenes
        return res.status(200).json(ordenes);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ mensaje: "Error al obtener las órdenes" });
    }
};

module.exports = {
    crearOrden,
    obtenerOrdenPorId,
    actualizarEstadoOrden,
    eliminarOrden,
    obtenerOrdenes  // Añadido a la exportación
};
