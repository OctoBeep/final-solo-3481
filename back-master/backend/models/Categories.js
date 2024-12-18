const mongoose = require('mongoose');

// Definición del esquema para la categoría
const CategorySchema = new mongoose.Schema({
    nombre: { type: String, required: true, unique: true },
    descripcion: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Category', CategorySchema);
