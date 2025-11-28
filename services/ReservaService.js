const ReservaRepository = require('../repositories/ReservaRepository');
const HabitacionRepository = require('../repositories/HabitacionRepository');

class ReservaService {
  async obtenerTodas() {
    return await ReservaRepository.obtenerTodas();
  }

  async obtenerPorId(id) {
    const reserva = await ReservaRepository.obtenerPorId(id);
    if (!reserva) {
      throw new Error('Reserva no encontrada');
    }
    return reserva;
  }

  async obtenerPorUsuario(usuarioId) {
    return await ReservaRepository.obtenerPorUsuario(usuarioId);
  }

  async crear(reservaData) {
    // Verificar que la habitación existe
    const habitacion = await HabitacionRepository.obtenerPorId(reservaData.habitacionId);
    if (!habitacion) {
      throw new Error('Habitación no encontrada');
    }

    // Verificar que la habitación esté disponible
    if (habitacion.estado !== 'disponible') {
      throw new Error('La habitación no está disponible');
    }

    // Calcular el total
    const dias = (new Date(reservaData.fechaSalida) - new Date(reservaData.fechaEntrada)) / (1000 * 60 * 60 * 24);
    reservaData.total = dias * habitacion.precioPorNoche;

    const reserva = await ReservaRepository.crear(reservaData);

    // Actualizar el estado de la habitación a ocupada
    await HabitacionRepository.actualizar(habitacion._id, { estado: 'ocupada' });

    return reserva;
  }

  async actualizar(id, reservaData) {
    const reserva = await ReservaRepository.actualizar(id, reservaData);
    if (!reserva) {
      throw new Error('Reserva no encontrada');
    }
    return reserva;
  }

  async eliminar(id) {
    const reserva = await ReservaRepository.eliminar(id);
    if (!reserva) {
      throw new Error('Reserva no encontrada');
    }

    // Liberar la habitación
    await HabitacionRepository.actualizar(reserva.habitacionId, { estado: 'disponible' });

    return reserva;
  }
}

module.exports = new ReservaService();