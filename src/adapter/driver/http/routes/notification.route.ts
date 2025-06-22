import { Router } from 'express';
import { sendSuccessNotification, sendErrorNotification } from '../presenters/notification.presenter';

const router = Router();

/**
 * @swagger
 * /api/notify/success:
 *   post:
 *     summary: Envia notificação de sucesso por e-mail
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
 *     responses:
 *       200:
 *         description: E-mail de sucesso enviado
 *       500:
 *         description: Erro ao enviar e-mail
 */
router.post('/notify/success', sendSuccessNotification);

/**
 * @swagger
 * /api/notify/error:
 *   post:
 *     summary: Envia notificação de erro por e-mail
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
 *     responses:
 *       200:
 *         description: E-mail de erro enviado
 *       500:
 *         description: Erro ao enviar e-mail
 */
router.post('/notify/error', sendErrorNotification);

export default router; 