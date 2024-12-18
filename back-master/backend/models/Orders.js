const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    platos: [
        {
            nombre: { type: String, required: true }, // Nombre del plato
            cantidad: { type: Number, required: true } // Cantidad del plato
        }
    ],
    estado: { type: String, enum: ['pendiente', 'entregado', 'cancelado'], default: 'pendiente' }
}, { timestamps: true }); // timestamps añade automáticamente "createdAt" y "updatedAt"

module.exports = mongoose.model('Orders', OrderSchema);
