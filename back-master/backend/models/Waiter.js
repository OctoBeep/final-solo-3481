const mongoose = require('mongoose');

const WaiterSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    dni: { type: String, required: true, unique: true },
    activo: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Waiter', WaiterSchema);
