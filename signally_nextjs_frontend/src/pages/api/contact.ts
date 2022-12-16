import { NextApiRequest, NextApiResponse } from 'next/types';
import * as nodemailer from 'nodemailer';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { email, name, message } = req.body;

      const mailBody = `
      <div>
        <h2>Signally Contact Form</h2>
        <p>Name: ${name}</p>
        <p>Email: ${email}</p>
        <p>Message: ${message}</p>
      </div>
    `;

      const emails = [process.env.SMTP_EMAIL!];

      sendMail(emails, mailBody, 'Signally Contact Form');
      res.status(200).send('Sent!');
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}

async function sendMail(emailAddresses: string[], mailBody: string, subject: string) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true,
    auth: {
      user: `${process.env.SMTP_EMAIL}`,
      pass: `${process.env.SMTP_PASSWORD}`
    }
  });

  const mailOptions = {
    from: `Contact alert for Signally <${process.env.SMTP_EMAIL}>`,
    to: `${emailAddresses}`,
    subject: `${subject}`,
    html: `${mailBody}`
  };

  transporter.sendMail(mailOptions, (error: any, data: any) => {});
}

export default handler;
