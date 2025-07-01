import { Request, Response } from 'express';
import { sendEmail } from '../../../driven/email/email.service';

export async function sendSuccessNotification(req: Request, res: Response) {
  const { to, message, file } = req.body;
  
  try {
    await sendEmail(to, 'Operação realizada com sucesso', message, file);
    res.status(200).json({ message: 'E-mail de sucesso enviado' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao enviar e-mail de sucesso' });
  }
}

export async function sendErrorNotification(req: Request, res: Response) {
  const { to, message, file } = req.body;
  
  try {
    await sendEmail(to, 'Erro na operação', message, file);
    res.status(200).json({ message: 'E-mail de erro enviado' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao enviar e-mail de erro' });
  }
} 