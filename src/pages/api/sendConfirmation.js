// pages/api/sendConfirmation.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, houseName, checkIn, checkOut, totalPrice } = req.body;

    // Erstelle den Nodemailer-Transporter mit Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER, // Deine Gmail-Adresse
        pass: process.env.GMAIL_PASS, // Dein Gmail-Passwort oder App-Passwort
      },
    });

    // E-Mail-Details
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Buchungsbestätigung',
      text: `Hallo,

Sie haben erfolgreich das Haus "${houseName}" vom ${checkIn} bis ${checkOut} gebucht.
Der Gesamtbetrag beträgt: ${totalPrice} EUR.

Vielen Dank für Ihre Buchung!
`,
    };

    try {
      // Senden der E-Mail
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Error sending email' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}