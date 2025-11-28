const mongoose = require('mongoose');

const reservaSchema = new mongoose.Schema({
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  },
  habitacionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Habitacion',
    required: true,
  },
  fechaEntrada: {
    type: Date,
    required: true,
  },
  fechaSalida: {
    type: Date,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Reserva', reservaSchema);