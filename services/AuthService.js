const UsuarioRepository = require('../repositories/UsuarioRepository');
const jwt = require('jsonwebtoken');

class AuthService {
  async registrar(usuarioData) {
    // Verificar si el email ya existe
    const existeUsuario = await UsuarioRepository.encontrarPorEmail(usuarioData.email);
    if (existeUsuario) {
      throw new Error('El email ya está registrado');
    }

    // Crear usuario
    const usuario = await UsuarioRepository.crear(usuarioData);

    // Generar token
    const token = jwt.sign({ id: usuario._id, rol: usuario.rol }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    return { usuario, token };
  }

  async login(email, password) {
    // Verificar si el usuario existe
    const usuario = await UsuarioRepository.encontrarPorEmail(email);
    if (!usuario) {
      throw new Error('Credenciales incorrectas');
    }

    // Verificar contraseña
    const esPasswordCorrecto = await usuario.compararPassword(password);
    if (!esPasswordCorrecto) {
      throw new Error('Credenciales incorrectas');
    }

    // Generar token
    const token = jwt.sign({ id: usuario._id, rol: usuario.rol }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    return { usuario, token };
  }
}

module.exports = new AuthService();