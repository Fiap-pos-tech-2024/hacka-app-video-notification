import nodemailer from 'nodemailer';
import { sendEmail } from '../../../../src/adapter/driven/email/email.service';

jest.mock('nodemailer');

describe('Email Service', () => {
  it('deve enviar e-mail com sucesso', async () => {
    const sendMailMock = jest.fn().mockResolvedValue({});
    (nodemailer.createTransport as jest.Mock).mockReturnValue({ sendMail: sendMailMock });

    await sendEmail('to@email.com', 'Assunto', 'Mensagem');

    expect(nodemailer.createTransport).toHaveBeenCalled();
    expect(sendMailMock).toHaveBeenCalledWith({
      from: undefined, // ou process.env.SMTP_USER se mockar env
      to: 'to@email.com',
      subject: 'Assunto',
      text: 'Mensagem',
    });
  });

  it('deve lançar erro ao falhar envio', async () => {
    const sendMailMock = jest.fn().mockRejectedValue(new Error('fail'));
    (nodemailer.createTransport as jest.Mock).mockReturnValue({ sendMail: sendMailMock });

    await expect(sendEmail('to@email.com', 'Assunto', 'Mensagem')).rejects.toThrow('fail');
  });
}); 