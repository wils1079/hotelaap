const mongoose = require('mongoose');

const habitacionSchema = new mongoose.Schema({
  numero: {
    type: String,
    required: true,
    unique: true,
  },
  tipo: {
    type: String,
    enum: ['simple', 'doble', 'suite'],
    required: true,
  },
  precioPorNoche: {
    type: Number,
    required: true,
  },
  estado: {
    type: String,
    enum: ['disponible', 'ocupada', 'mantenimiento'],
    default: 'disponible',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Habitacion', habitacionSchema);