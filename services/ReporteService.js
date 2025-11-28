const ReporteRepository = require('../repositories/ReporteRepository');

class ReporteService {
  async obtenerTodos() {
    return await ReporteRepository.obtenerTodos();
  }

  async obtenerPorId(id) {
    const reporte = await ReporteRepository.obtenerPorId(id);
    if (!reporte) {
      throw new Error('Reporte no encontrado');
    }
    return reporte;
  }

  async crear(reporteData) {
    return await ReporteRepository.crear(reporteData);
  }

  async eliminar(id) {
    const reporte = await ReporteRepository.eliminar(id);
    if (!reporte) {
      throw new Error('Reporte no encontrado');
    }
    return reporte;
  }
}

module.exports = new ReporteService();