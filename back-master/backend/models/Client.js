const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    telefono: { type: String, required: true },
    dni: { type: String, required: true, unique: true }
}, { timestamps: true });

module.exports = mongoose.model('Client', ClientSchema);
