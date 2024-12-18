const Waiter = require('../models/Waiter');

// Crear un nuevo mesero
exports.crearMesero = async (req, res) => {
    try {
        const { nombre, apellido, email, dni } = req.body;

        // Verificar si el mesero ya existe
        const meseroExistente = await Waiter.findOne({ dni });
        if (meseroExistente) {
            return res.status(400).json({ message: 'El mesero ya existe' });
        }

        // Crear un nuevo mesero
        const mesero = new Waiter({
            nombre,
            apellido,
            email,
            dni
        });

        // Guardar el mesero
        await mesero.save();
        return res.status(201).json(mesero);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Error al crear el mesero" });
    }
};

// Obtener todos los meseros
exports.obtenerMeseros = async (req, res) => {
    try {
        const meseros = await Waiter.find();  // Obtener todos los meseros
        return res.status(200).json(meseros);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Error al obtener los meseros" });
    }
};

// Obtener un mesero por ID
exports.obtenerMeseroPorId = async (req, res) => {
    try {
        const mesero = await Waiter.findById(req.params.id);
        if (!mesero) {
            return res.status(404).json({ message: 'Mesero no encontrado' });
        }
        return res.status(200).json(mesero);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Error al obtener el mesero" });
    }
};

// Actualizar datos de un mesero
exports.actualizarMesero = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, apellido, email, dni } = req.body;

        // Actualizar los datos del mesero
        const mesero = await Waiter.findByIdAndUpdate(
            id, 
            { nombre, apellido, email, dni }, 
            { new: true }
        );
        if (!mesero) {
            return res.status(404).json({ message: 'Mesero no encontrado' });
        }

        return res.status(200).json(mesero);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Error al actualizar el mesero" });
    }
};

// Eliminar un mesero (eliminación lógica)
exports.eliminarMesero = async (req, res) => {
    try {
        const { id } = req.params;

        // Actualizar el estado activo del mesero (eliminación lógica)
        const mesero = await Waiter.findByIdAndUpdate(
            id, 
            { activo: false }, 
            { new: true }
        );
        if (!mesero) {
            return res.status(404).json({ message: 'Mesero no encontrado' });
        }

        return res.status(200).json({ message: 'Mesero eliminado exitosamente' });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Error al eliminar el mesero" });
    }
};
