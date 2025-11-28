const express = require('express');
const verificarToken = require('../security/auth');
const verificarRol = require('../security/roles');
const UsuarioService = require('../services/UsuarioService');
const router = express.Router();

// Solo Administrador General puede gestionar usuarios
router.use(verificarToken);
router.use(verificarRol(['admin']));

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 */
router.get('/', async (req, res, next) => {
  try {
    const usuarios = await UsuarioService.obtenerTodos();
    res.json(usuarios);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/usuarios/{id}:
 *   get:
 *     summary: Obtiene un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/:id', async (req, res, next) => {
  try {
    const usuario = await UsuarioService.obtenerPorId(req.params.id);
    res.json(usuario);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/usuarios/{id}:
 *   put:
 *     summary: Actualiza un usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               email:
 *                 type: string
 *               rol:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado
 */
router.put('/:id', async (req, res, next) => {
  try {
    const usuario = await UsuarioService.actualizar(req.params.id, req.body);
    res.json({ message: 'Usuario actualizado', usuario });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/usuarios/{id}:
 *   delete:
 *     summary: Elimina un usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario eliminado
 */
router.delete('/:id', async (req, res, next) => {
  try {
    await UsuarioService.eliminar(req.params.id);
    res.json({ message: 'Usuario eliminado' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;