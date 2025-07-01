import nodemailer from 'nodemailer';

export async function sendEmail(to: string, subject: string, text: string, file?: string) {
  if (!process.env.SMTP_HOST || !process.env.SMTP_PORT || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    throw new Error('Configurações SMTP não encontradas. Verifique as variáveis de ambiente.');
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions: any = {
    from: process.env.SMTP_USER,
    to,
    subject,
    text,
  };

  if (file) {
    mailOptions.text = `${text}\n\nArquivo: ${file}`;
  }

  await transporter.sendMail(mailOptions);
} 