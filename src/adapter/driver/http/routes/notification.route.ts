import { Router } from 'express'
import { sendSuccessNotification, sendErrorNotification } from '../presenters/notification.presenter'
import { authMiddleware } from '../middlewares/authMiddleware'

const router = Router()

/**
 * @swagger
 * /api/notify/success:
 *   post:
 *     summary: Envia notificação de sucesso por e-mail
 *     tags:
 *       - Notificações
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               to:
 *                 type: string
 *               message:
 *                 type: string
 *               file:
 *                 type: string
 *             required:
 *               - to
 *               - message
 *               - file
 *     responses:
 *       200:
 *         description: E-mail de sucesso enviado
 *       500:
 *         description: Erro ao enviar e-mail
 */
router.post('/notify/success', authMiddleware, sendSuccessNotification)

/**
 * @swagger
 * /api/notify/error:
 *   post:
 *     summary: Envia notificação de erro por e-mail
 *     tags:
 *       - Notificações
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               to:
 *                 type: string
 *               message:
 *                 type: string
 *               file:
 *                 type: string
 *             required:
 *               - to
 *               - message
 *               - file
 *     responses:
 *       200:
 *         description: E-mail de erro enviado
 *       500:
 *         description: Erro ao enviar e-mail
 */
router.post('/notify/error', authMiddleware, sendErrorNotification)

/**
 * @swagger
 * /api/notifications/health:
 *   get:
 *     summary: Health check do serviço
 *     tags:
 *       - Notificações
 *     responses:
 *       200:
 *         description: Serviço funcionando
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 timestamp:
 *                   type: string
 */
router.get('/notifications/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'notification-service',
    timestamp: new Date().toISOString()
  })
})

export default router
