const mongoose = require('mongoose');

const DishSchema = new mongoose.Schema({
    nombre: { type: String, required: true, unique: true },
    ingredientes: { type: [String], required: true },  // Un arreglo de ingredientes
    precio: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Dish', DishSchema);
