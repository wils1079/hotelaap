const PedidoRepository = require('../repositories/PedidoRepository');

class PedidoService {
  async obtenerTodos() {
    return await PedidoRepository.obtenerTodos();
  }

  async obtenerPorId(id) {
    const pedido = await PedidoRepository.obtenerPorId(id);
    if (!pedido) {
      throw new Error('Pedido no encontrado');
    }
    return pedido;
  }

  async obtenerPorReserva(reservaId) {
    return await PedidoRepository.obtenerPorReserva(reservaId);
  }

  async crear(pedidoData) {
    return await PedidoRepository.crear(pedidoData);
  }

  async actualizar(id, pedidoData) {
    const pedido = await PedidoRepository.actualizar(id, pedidoData);
    if (!pedido) {
      throw new Error('Pedido no encontrado');
    }
    return pedido;
  }

  async eliminar(id) {
    const pedido = await PedidoRepository.eliminar(id);
    if (!pedido) {
      throw new Error('Pedido no encontrado');
    }
    return pedido;
  }
}

module.exports = new PedidoService();