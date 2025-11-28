const express = require('express');
const verificarToken = require('../security/auth');
const verificarRol = require('../security/roles');
const ReservaService = require('../services/ReservaService');
const router = express.Router();

router.use(verificarToken);

/**
 * @swagger
 * /api/reservas:
 *   get:
 *     summary: Obtiene todas las reservas
 *     tags: [Reservas]
 *     responses:
 *       200:
 *         description: Lista de reservas
 */
router.get('/', verificarRol(['admin', 'Recepcionista']), async (req, res, next) => {
  try {
    const reservas = await ReservaService.obtenerTodas();
    res.json(reservas);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/reservas/usuario:
 *   get:
 *     summary: Obtiene las reservas del usuario actual (para clientes)
 *     tags: [Reservas]
 *     responses:
 *       200:
 *         description: Lista de reservas del usuario
 */
router.get('/usuario/mis-reservas', verificarRol(['Cliente']), async (req, res, next) => {
  try {
    const reservas = await ReservaService.obtenerPorUsuario(req.usuario.id);
    res.json(reservas);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/reservas/{id}:
 *   get:
 *     summary: Obtiene una reserva por ID
 *     tags: [Reservas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Reserva encontrada
 *       404:
 *         description: Reserva no encontrada
 */
router.get('/:id', async (req, res, next) => {
  try {
    const reserva = await ReservaService.obtenerPorId(req.params.id);
    // Si no es admin o recepcionista, solo puede ver sus propias reservas
    if (req.usuario.rol === 'Cliente' && reserva.usuarioId.toString() !== req.usuario.id) {
      return res.status(403).json({ message: 'No tienes permiso para ver esta reserva' });
    }
    res.json(reserva);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/reservas:
 *   post:
 *     summary: Crea una nueva reserva
 *     tags: [Reservas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - habitacionId
 *               - fechaEntrada
 *               - fechaSalida
 *             properties:
 *               habitacionId:
 *                 type: string
 *               fechaEntrada:
 *                 type: string
 *                 format: date
 *               fechaSalida:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Reserva creada
 */
router.post('/', verificarRol(['admin', 'Recepcionista', 'Cliente']), async (req, res, next) => {
  try {
    // Si es cliente, se asigna su propio ID
    if (req.usuario.rol === 'Cliente') {
      req.body.usuarioId = req.usuario.id;
    }
    const reserva = await ReservaService.crear(req.body);
    res.status(201).json({ message: 'Reserva creada', reserva });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/reservas/{id}:
 *   put:
 *     summary: Actualiza una reserva
 *     tags: [Reservas]
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
 *               habitacionId:
 *                 type: string
 *               fechaEntrada:
 *                 type: string
 *                 format: date
 *               fechaSalida:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Reserva actualizada
 */
router.put('/:id', verificarRol(['admin', 'Recepcionista']), async (req, res, next) => {
  try {
    const reserva = await ReservaService.actualizar(req.params.id, req.body);
    res.json({ message: 'Reserva actualizada', reserva });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/reservas/{id}:
 *   delete:
 *     summary: Elimina una reserva
 *     tags: [Reservas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Reserva eliminada
 */
router.delete('/:id', verificarRol(['admin', 'Recepcionista']), async (req, res, next) => {
  try {
    await ReservaService.eliminar(req.params.id);
    res.json({ message: 'Reserva eliminada' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;