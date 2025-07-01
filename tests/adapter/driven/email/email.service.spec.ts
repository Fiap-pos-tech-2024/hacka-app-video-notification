import nodemailer from 'nodemailer';
import { sendEmail } from '../../../../src/adapter/driven/email/email.service';

jest.mock('nodemailer');

describe('Email Service', () => {
  beforeEach(() => {
    process.env.SMTP_HOST = 'smtp.test.com';
    process.env.SMTP_PORT = '587';
    process.env.SMTP_USER = 'test@test.com';
    process.env.SMTP_PASS = 'password';
  });

  afterEach(() => {
    delete process.env.SMTP_HOST;
    delete process.env.SMTP_PORT;
    delete process.env.SMTP_USER;
    delete process.env.SMTP_PASS;
  });

  it('deve enviar e-mail com sucesso', async () => {
    const sendMailMock = jest.fn().mockResolvedValue({});
    (nodemailer.createTransport as jest.Mock).mockReturnValue({ sendMail: sendMailMock });

    await sendEmail('to@email.com', 'Assunto', 'Mensagem', 'arquivo.txt');

    expect(nodemailer.createTransport).toHaveBeenCalled();
    expect(sendMailMock).toHaveBeenCalledWith({
      from: 'test@test.com',
      to: 'to@email.com',
      subject: 'Assunto',
      text: 'Mensagem\n\nArquivo: arquivo.txt',
    });
  });

  it('deve enviar e-mail sem arquivo', async () => {
    const sendMailMock = jest.fn().mockResolvedValue({});
    (nodemailer.createTransport as jest.Mock).mockReturnValue({ sendMail: sendMailMock });

    await sendEmail('to@email.com', 'Assunto', 'Mensagem');

    expect(sendMailMock).toHaveBeenCalledWith({
      from: 'test@test.com',
      to: 'to@email.com',
      subject: 'Assunto',
      text: 'Mensagem',
    });
  });

  it('deve lançar erro ao falhar envio', async () => {
    const sendMailMock = jest.fn().mockRejectedValue(new Error('fail'));
    (nodemailer.createTransport as jest.Mock).mockReturnValue({ sendMail: sendMailMock });

    await expect(sendEmail('to@email.com', 'Assunto', 'Mensagem', 'arquivo.txt')).rejects.toThrow('fail');
  });

  it('deve lançar erro quando variáveis de ambiente não estão configuradas', async () => {
    delete process.env.SMTP_HOST;

    await expect(sendEmail('to@email.com', 'Assunto', 'Mensagem')).rejects.toThrow('Configurações SMTP não encontradas');
  });
}); 