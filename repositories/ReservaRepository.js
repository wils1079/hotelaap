const Reserva = require('../models/Reserva');

class ReservaRepository {
  async obtenerTodas() {
    return await Reserva.find()
      .populate('usuarioId', 'nombre email')
      .populate('habitacionId', 'numero tipo precioPorNoche');
  }

  async obtenerPorId(id) {
    return await Reserva.findById(id)
      .populate('usuarioId', 'nombre email')
      .populate('habitacionId', 'numero tipo precioPorNoche');
  }

  async obtenerPorUsuario(usuarioId) {
    return await Reserva.find({ usuarioId })
      .populate('habitacionId', 'numero tipo precioPorNoche');
  }

  async crear(reservaData) {
    const reserva = new Reserva(reservaData);
    return await reserva.save();
  }

  async actualizar(id, reservaData) {
    return await Reserva.findByIdAndUpdate(id, reservaData, { new: true })
      .populate('usuarioId', 'nombre email')
      .populate('habitacionId', 'numero tipo precioPorNoche');
  }

  async eliminar(id) {
    return await Reserva.findByIdAndDelete(id);
  }
}

module.exports = new ReservaRepository();