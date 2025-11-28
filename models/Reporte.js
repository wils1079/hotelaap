const mongoose = require('mongoose');

const reporteSchema = new mongoose.Schema({
  tipo: {
    type: String,
    enum: ['ocupación', 'ingresos', 'pedidos', 'limpieza'],
    required: true,
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
  contenido: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Reporte', reporteSchema);