const express = require('express');
const verificarToken = require('../security/auth');
const verificarRol = require('../security/roles');
const ReporteService = require('../services/ReporteService');
const router = express.Router();

router.use(verificarToken);

/**
 * @swagger
 * /api/reportes:
 *   get:
 *     summary: Obtiene todos los reportes
 *     tags: [Reportes]
 *     responses:
 *       200:
 *         description: Lista de reportes
 */
router.get('/', verificarRol(['admin']), async (req, res, next) => {
  try {
    const reportes = await ReporteService.obtenerTodos();
    res.json(reportes);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/reportes/{id}:
 *   get:
 *     summary: Obtiene un reporte por ID
 *     tags: [Reportes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Reporte encontrado
 *       404:
 *         description: Reporte no encontrado
 */
router.get('/:id', verificarRol(['admin']), async (req, res, next) => {
  try {
    const reporte = await ReporteService.obtenerPorId(req.params.id);
    res.json(reporte);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/reportes:
 *   post:
 *     summary: Crea un nuevo reporte
 *     tags: [Reportes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tipo
 *               - contenido
 *             properties:
 *               tipo:
 *                 type: string
 *                 enum: [ocupación, ingresos, pedidos, limpieza]
 *               contenido:
 *                 type: string
 *     responses:
 *       201:
 *         description: Reporte creado
 */
router.post('/', verificarRol(['admin']), async (req, res, next) => {
  try {
    const reporte = await ReporteService.crear(req.body);
    res.status(201).json({ message: 'Reporte creado', reporte });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/reportes/{id}:
 *   delete:
 *     summary: Elimina un reporte
 *     tags: [Reportes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Reporte eliminado
 */
router.delete('/:id', verificarRol(['admin']), async (req, res, next) => {
  try {
    await ReporteService.eliminar(req.params.id);
    res.json({ message: 'Reporte eliminado' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;