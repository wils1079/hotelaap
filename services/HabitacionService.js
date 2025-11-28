const HabitacionRepository = require('../repositories/HabitacionRepository');

class HabitacionService {
  async obtenerTodas() {
    return await HabitacionRepository.obtenerTodas();
  }

  async obtenerPorId(id) {
    const habitacion = await HabitacionRepository.obtenerPorId(id);
    if (!habitacion) {
      throw new Error('Habitación no encontrada');
    }
    return habitacion;
  }

  async crear(habitacionData) {
    // Verificar que el número de habitación no exista
    const existeHabitacion = await HabitacionRepository.obtenerPorNumero(habitacionData.numero);
    if (existeHabitacion) {
      throw new Error('El número de habitación ya existe');
    }

    return await HabitacionRepository.crear(habitacionData);
  }

  async actualizar(id, habitacionData) {
    const habitacion = await HabitacionRepository.actualizar(id, habitacionData);
    if (!habitacion) {
      throw new Error('Habitación no encontrada');
    }
    return habitacion;
  }

  async eliminar(id) {
    const habitacion = await HabitacionRepository.eliminar(id);
    if (!habitacion) {
      throw new Error('Habitación no encontrada');
    }
    return habitacion;
  }
}

module.exports = new HabitacionService();