const Habitacion = require('../models/Habitacion');

class HabitacionRepository {
  async obtenerTodas() {
    return await Habitacion.find();
  }

  async obtenerPorId(id) {
    return await Habitacion.findById(id);
  }

  async obtenerPorNumero(numero) {
    return await Habitacion.findOne({ numero });
  }

  async crear(habitacionData) {
    const habitacion = new Habitacion(habitacionData);
    return await habitacion.save();
  }

  async actualizar(id, habitacionData) {
    return await Habitacion.findByIdAndUpdate(id, habitacionData, { new: true });
  }

  async eliminar(id) {
    return await Habitacion.findByIdAndDelete(id);
  }
}

module.exports = new HabitacionRepository();