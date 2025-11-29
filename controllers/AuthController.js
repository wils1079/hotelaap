const express = require('express');
const AuthService = require('../services/AuthService');
const router = express.Router();

/**
 * @swagger
 * /api/auth/registro:
 *   post:
 *     summary: Registra un nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - email
 *               - password
 *               - rol
 *             properties:
 *               nombre:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               rol:
 *                 type: string
 *                 enum: [Administrador General, Recepcionista, Cocinero, limpieza, Cliente]
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.post('/registro', async (req, res, next) => {
  try {
    const { usuario, token } = await AuthService.registrar(req.body);
    res.status(201).json({ message: 'Usuario registrado', usuario, token });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Inicia sesión de un usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login exitoso
 *       400:
 *         description: Credenciales incorrectas
 */
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { usuario, token } = await AuthService.login(email, password);
    res.json({ message: 'Login exitoso', usuario, token });
  } catch (error) {
    next(error);
  }
});

module.exports = router;