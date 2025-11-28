const Reporte = require('../models/Reporte');

class ReporteRepository {
  async obtenerTodos() {
    return await Reporte.find();
  }

  async obtenerPorId(id) {
    return await Reporte.findById(id);
  }

  async crear(reporteData) {
    const reporte = new Reporte(reporteData);
    return await reporte.save();
  }

  async eliminar(id) {
    return await Reporte.findByIdAndDelete(id);
  }
}

module.exports = new ReporteRepository();