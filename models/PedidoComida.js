const mongoose = require('mongoose');

const pedidoComidaSchema = new mongoose.Schema({
  reservaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reserva',
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  estado: {
    type: String,
    enum: ['pendiente', 'en preparación', 'entregado'],
    default: 'pendiente',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('PedidoComida', pedidoComidaSchema);