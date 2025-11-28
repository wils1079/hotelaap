const UsuarioRepository = require('../repositories/UsuarioRepository');

class UsuarioService {
  async obtenerTodos() {
    return await UsuarioRepository.obtenerTodos();
  }

  async obtenerPorId(id) {
    const usuario = await UsuarioRepository.obtenerPorId(id);
    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }
    return usuario;
  }

  async actualizar(id, usuarioData) {
    const usuario = await UsuarioRepository.actualizar(id, usuarioData);
    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }
    return usuario;
  }

  async eliminar(id) {
    const usuario = await UsuarioRepository.eliminar(id);
    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }
    return usuario;
  }
}

module.exports = new UsuarioService();