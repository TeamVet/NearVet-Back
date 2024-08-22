import nodemailer from 'nodemailer';

export async function sendEmail(
  to: string,
  subject: string,
  text: string,
  html: string,
) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: 'maddison53@ethereal.email',
      pass: 'jn7jnAPss4f63QBp6D',
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    text: text, // plain text body
    html: html, // html body
  });

  console.log('Message sent: %s', info.messageId);
  return info;
}
