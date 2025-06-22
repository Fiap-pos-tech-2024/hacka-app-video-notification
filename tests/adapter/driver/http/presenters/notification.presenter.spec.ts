import { sendSuccessNotification, sendErrorNotification } from '../../../../../src/adapter/driver/http/presenters/notification.presenter';
import * as emailService from '../../../../../src/adapter/driven/email/email.service';

describe('Notification Presenter', () => {
  const mockReq = (body: any) => ({ body } as any);
  const mockRes = () => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve enviar e-mail de sucesso', async () => {
    jest.spyOn(emailService, 'sendEmail').mockResolvedValueOnce(undefined);
    const req = mockReq({ to: 'test@email.com', message: 'ok' });
    const res = mockRes();

    await sendSuccessNotification(req, res);

    expect(emailService.sendEmail).toHaveBeenCalledWith('test@email.com', expect.stringContaining('sucesso'), 'ok');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'E-mail de sucesso enviado' });
  });

  it('deve retornar erro ao falhar envio de e-mail de sucesso', async () => {
    jest.spyOn(emailService, 'sendEmail').mockRejectedValueOnce(new Error('fail'));
    const req = mockReq({ to: 'test@email.com', message: 'ok' });
    const res = mockRes();

    await sendSuccessNotification(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao enviar e-mail de sucesso' });
  });

  it('deve enviar e-mail de erro', async () => {
    jest.spyOn(emailService, 'sendEmail').mockResolvedValueOnce(undefined);
    const req = mockReq({ to: 'test@email.com', message: 'fail' });
    const res = mockRes();

    await sendErrorNotification(req, res);

    expect(emailService.sendEmail).toHaveBeenCalledWith('test@email.com', expect.stringContaining('Erro'), 'fail');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'E-mail de erro enviado' });
  });

  it('deve retornar erro ao falhar envio de e-mail de erro', async () => {
    jest.spyOn(emailService, 'sendEmail').mockRejectedValueOnce(new Error('fail'));
    const req = mockReq({ to: 'test@email.com', message: 'fail' });
    const res = mockRes();

    await sendErrorNotification(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao enviar e-mail de erro' });
  });
}); 