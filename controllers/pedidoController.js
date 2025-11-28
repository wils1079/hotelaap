const express = require('express');
const verificarToken = require('../security/auth');
const verificarRol = require('../security/roles');
const PedidoService = require('../services/PedidoService');
const router = express.Router();

router.use(verificarToken);

/**
 * @swagger
 * /api/pedidos:
 *   get:
 *     summary: Obtiene todos los pedidos
 *     tags: [Pedidos]
 *     responses:
 *       200:
 *         description: Lista de pedidos
 */
router.get('/', verificarRol(['admin', 'Cocinero']), async (req, res, next) => {
  try {
    const pedidos = await PedidoService.obtenerTodos();
    res.json(pedidos);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/pedidos/reserva/{reservaId}:
 *   get:
 *     summary: Obtiene los pedidos de una reserva
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: reservaId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de pedidos de la reserva
 */
router.get('/reserva/:reservaId', async (req, res, next) => {
  try {
    const pedidos = await PedidoService.obtenerPorReserva(req.params.reservaId);
    // Verificar que el usuario tenga permiso para ver estos pedidos
    if (req.usuario.rol === 'Cliente') {
      // Obtener la reserva para verificar el usuario
      const Reserva = require('../models/Reserva');
      const reserva = await Reserva.findById(req.params.reservaId);
      if (reserva.usuarioId.toString() !== req.usuario.id) {
        return res.status(403).json({ message: 'No tienes permiso para ver estos pedidos' });
      }
    }
    res.json(pedidos);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/pedidos/{id}:
 *   get:
 *     summary: Obtiene un pedido por ID
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pedido encontrado
 *       404:
 *         description: Pedido no encontrado
 */
router.get('/:id', async (req, res, next) => {
  try {
    const pedido = await PedidoService.obtenerPorId(req.params.id);
    // Si es cliente, verificar que la reserva del pedido le pertenece
    if (req.usuario.rol === 'Cliente') {
      const Reserva = require('../models/Reserva');
      const reserva = await Reserva.findById(pedido.reservaId);
      if (reserva.usuarioId.toString() !== req.usuario.id) {
        return res.status(403).json({ message: 'No tienes permiso para ver este pedido' });
      }
    }
    res.json(pedido);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/pedidos:
 *   post:
 *     summary: Crea un nuevo pedido
 *     tags: [Pedidos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - reservaId
 *               - descripcion
 *               - precio
 *             properties:
 *               reservaId:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               precio:
 *                 type: number
 *     responses:
 *       201:
 *         description: Pedido creado
 */
router.post('/', verificarRol(['admin', 'Recepcionista', 'Cliente']), async (req, res, next) => {
  try {
    // Si es cliente, verificar que la reserva le pertenece
    if (req.usuario.rol === 'Cliente') {
      const Reserva = require('../models/Reserva');
      const reserva = await Reserva.findById(req.body.reservaId);
      if (reserva.usuarioId.toString() !== req.usuario.id) {
        return res.status(403).json({ message: 'No tienes permiso para crear un pedido en esta reserva' });
      }
    }
    const pedido = await PedidoService.crear(req.body);
    res.status(201).json({ message: 'Pedido creado', pedido });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/pedidos/{id}:
 *   put:
 *     summary: Actualiza un pedido
 *     tags: [Pedidos]
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
 *               descripcion:
 *                 type: string
 *               precio:
 *                 type: number
 *               estado:
 *                 type: string
 *                 enum: [pendiente, en preparación, entregado]
 *     responses:
 *       200:
 *         description: Pedido actualizado
 */
router.put('/:id', verificarRol(['admin', 'Cocinero']), async (req, res, next) => {
  try {
    const pedido = await PedidoService.actualizar(req.params.id, req.body);
    res.json({ message: 'Pedido actualizado', pedido });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/pedidos/{id}:
 *   delete:
 *     summary: Elimina un pedido
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pedido eliminado
 */
router.delete('/:id', verificarRol(['admin']), async (req, res, next) => {
  try {
    await PedidoService.eliminar(req.params.id);
    res.json({ message: 'Pedido eliminado' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;