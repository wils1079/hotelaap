const PedidoComida = require('../models/PedidoComida');

class PedidoRepository {

  async obtenerTodos() {
    return await PedidoComida.find()
      .populate({
        path: 'reservaId',
        populate: [
          {
            path: 'usuarioId',
            model: 'Usuario'
          },
          {
            path: 'habitacionId',
            model: 'Habitacion'
          }
        ]
      })
      .populate('usuarioId');
  }

  async obtenerPorReserva(reservaId) {
    return await PedidoComida.find({ reservaId })
      .populate({
        path: 'reservaId',
        populate: [
          {
            path: 'usuarioId',
            model: 'Usuario'
          },
          {
            path: 'habitacionId',
            model: 'Habitacion'
          }
        ]
      })
      .populate('usuarioId');
  }

  async obtenerPorId(id) {
    return await PedidoComida.findById(id)
      .populate({
        path: 'reservaId',
        populate: [
          {
            path: 'usuarioId',
            model: 'Usuario'
          },
          {
            path: 'habitacionId',
            model: 'Habitacion'
          }
        ]
      })
      .populate('usuarioId');
  }

  async crear(data) {
    return await PedidoComida.create(data);
  }

  async actualizar(id, data) {
    return await PedidoComida.findByIdAndUpdate(id, data, { new: true });
  }

  async eliminar(id) {
    return await PedidoComida.findByIdAndDelete(id);
  }
}

module.exports = new PedidoRepository();
