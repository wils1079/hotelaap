const PedidoComida = require('../models/PedidoComida');

class PedidoRepository {
  async obtenerTodos() {
    return await PedidoComida.find().populate('reservaId');
  }

  async obtenerPorId(id) {
    return await PedidoComida.findById(id).populate('reservaId');
  }

  async obtenerPorReserva(reservaId) {
    return await PedidoComida.find({ reservaId }).populate('reservaId');
  }

  async crear(pedidoData) {
    const pedido = new PedidoComida(pedidoData);
    return await pedido.save();
  }

  async actualizar(id, pedidoData) {
    return await PedidoComida.findByIdAndUpdate(id, pedidoData, { new: true }).populate('reservaId');
  }

  async eliminar(id) {
    return await PedidoComida.findByIdAndDelete(id);
  }
}

module.exports = new PedidoRepository();