const express = require('express');
const verificarToken = require('../security/auth');
const verificarRol = require('../security/roles');
const HabitacionService = require('../services/HabitacionService');
const router = express.Router();

// Todos los endpoints requieren token
router.use(verificarToken);

/**
 * @swagger
 * /api/habitaciones:
 *   get:
 *     summary: Obtiene todas las habitaciones
 *     tags: [Habitaciones]
 *     responses:
 *       200:
 *         description: Lista de habitaciones
 */
router.get('/', async (req, res, next) => {
  try {
    const habitaciones = await HabitacionService.obtenerTodas();
    res.json(habitaciones);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/habitaciones/{id}:
 *   get:
 *     summary: Obtiene una habitación por ID
 *     tags: [Habitaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Habitación encontrada
 *       404:
 *         description: Habitación no encontrada
 */
router.get('/:id', async (req, res, next) => {
  try {
    const habitacion = await HabitacionService.obtenerPorId(req.params.id);
    res.json(habitacion);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/habitaciones:
 *   post:
 *     summary: Crea una nueva habitación
 *     tags: [Habitaciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - numero
 *               - tipo
 *               - precioPorNoche
 *             properties:
 *               numero:
 *                 type: string
 *               tipo:
 *                 type: string
 *                 enum: [simple, doble, suite]
 *               precioPorNoche:
 *                 type: number
 *               estado:
 *                 type: string
 *                 enum: [disponible, ocupada, mantenimiento]
 *     responses:
 *       201:
 *         description: Habitación creada
 */
router.post('/', verificarRol(['admin']), async (req, res, next) => {
  try {
    const habitacion = await HabitacionService.crear(req.body);
    res.status(201).json({ message: 'Habitación creada', habitacion });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/habitaciones/{id}:
 *   put:
 *     summary: Actualiza una habitación
 *     tags: [Habitaciones]
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
 *               numero:
 *                 type: string
 *               tipo:
 *                 type: string
 *                 enum: [simple, doble, suite]
 *               precioPorNoche:
 *                 type: number
 *               estado:
 *                 type: string
 *                 enum: [disponible, ocupada, mantenimiento]
 *     responses:
 *       200:
 *         description: Habitación actualizada
 */
router.put('/:id', verificarRol(['admin']), async (req, res, next) => {
  try {
    const habitacion = await HabitacionService.actualizar(req.params.id, req.body);
    res.json({ message: 'Habitación actualizada', habitacion });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/habitaciones/{id}:
 *   delete:
 *     summary: Elimina una habitación
 *     tags: [Habitaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Habitación eliminada
 */
router.delete('/:id', verificarRol(['admin']), async (req, res, next) => {
  try {
    await HabitacionService.eliminar(req.params.id);
    res.json({ message: 'Habitación eliminada' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;