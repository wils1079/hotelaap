const Usuario = require('../models/Usuario');

class UsuarioRepository {
  async crear(usuarioData) {
    const usuario = new Usuario(usuarioData);
    return await usuario.save();
  }

  async encontrarPorEmail(email) {
    return await Usuario.findOne({ email });
  }

  async obtenerTodos() {
    return await Usuario.find().select('-password');
  }

  async obtenerPorId(id) {
    return await Usuario.findById(id).select('-password');
  }

  async actualizar(id, usuarioData) {
    return await Usuario.findByIdAndUpdate(id, usuarioData, { new: true }).select('-password');
  }

  async eliminar(id) {
    return await Usuario.findByIdAndDelete(id);
  }
}

module.exports = new UsuarioRepository();