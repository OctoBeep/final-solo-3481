const Client = require('../models/Client');

// Registrar un nuevo cliente
exports.registrarCliente = async (req, res) => {
    try {
        const { nombre, email, telefono, dni } = req.body;

        // Verificar si el cliente ya existe
        const clienteExistente = await Client.findOne({ dni });
        if (clienteExistente) {
            return res.status(400).json({ message: 'El cliente ya existe' });
        }

        // Crear un nuevo cliente
        const cliente = new Client({
            nombre,
            email,
            telefono,
            dni
        });

        // Guardar el cliente
        await cliente.save();
        return res.status(201).json(cliente);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Error al registrar el cliente" });
    }
};

// Obtener un cliente por ID
exports.obtenerClientePorId = async (req, res) => {
    try {
        const cliente = await Client.findById(req.params.id);
        if (!cliente) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }
        return res.status(200).json(cliente);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Error al obtener el cliente" });
    }
};

// Actualizar la información del cliente
exports.actualizarCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, email, telefono, dni } = req.body;

        // Actualizar los datos del cliente
        const cliente = await Client.findByIdAndUpdate(id, { nombre, email, telefono, dni }, { new: true });
        if (!cliente) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }

        return res.status(200).json(cliente);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Error al actualizar el cliente" });
    }
};

// Eliminar un cliente de forma total
exports.eliminarCliente = async (req, res) => {
    try {
        const { id } = req.params;

        // Eliminar el cliente de la base de datos
        const cliente = await Client.findByIdAndDelete(id);
        if (!cliente) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }

        return res.status(200).json({ message: 'Cliente eliminado exitosamente' });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Error al eliminar el cliente" });
    }
};
// Obtener todos los clientes
exports.obtenerClientes = async (req, res) => {
    try {
        const clientes = await Client.find();  // Obtener todos los clientes
        return res.status(200).json(clientes);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Error al obtener los clientes" });
    }
};