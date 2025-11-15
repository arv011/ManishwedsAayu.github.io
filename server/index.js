require('dotenv').config();
const express = require('express');
const cors = require('cors');
const https = require('https');
const querystring = require('querystring');
const app = express();

// CORS FOR FRONTEND (allow your frontend domain)
app.use(cors({
  origin: ['http://localhost:8080', 'http://127.0.0.1:8080'], // add others if needed
  methods: ['GET','POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());


app.use(express.json());

// Optional nodemailer (for SMTP email)
let nodemailer = null;
try {
  nodemailer = require('nodemailer');
} catch (e) {
  nodemailer = null;
}

// Helper: send email
async function sendEmail({HOST, PORT, USER, PASS, FROM, TO, subject, text}) {
  if (!nodemailer) throw new Error('nodemailer not installed');

  const transporter = nodemailer.createTransport({
    host: HOST,
    port: Number(PORT) || 587,
    secure: Number(PORT) === 465,
    auth: USER && PASS ? { user: USER, pass: PASS } : undefined,
  });

  return transporter.sendMail({ from: FROM, to: TO, subject, text });
}

app.post('/api/rsvp', async (req, res) => {
  try {
    const { name, email, attending, guests, message } = req.body || {};
    if (!name || !email || !attending) {
      return res.status(400).json({ error: 'Missing required fields: name, email, attending' });
    }

    const timestamp = new Date().toISOString();
    const text = `New RSVP
Name: ${name}
Email: ${email}
Attending: ${attending}
Guests: ${guests || '0'}
Message: ${message || '-'}
Received: ${timestamp}`;

    console.log('Received RSVP:', { name, email, attending, guests, message, timestamp });

    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_USER,
      SMTP_PASS,
      EMAIL_FROM,
      EMAIL_TO,
    } = process.env;

    console.log("SMTP loaded:", { SMTP_HOST, SMTP_PORT, EMAIL_FROM, EMAIL_TO });

    let notifyResult = null;
    let notifyMethod = null;

    // EMAIL PRIORITY
    if (SMTP_HOST && EMAIL_FROM && EMAIL_TO) {
      try {
        const info = await sendEmail({
          HOST: SMTP_HOST,
          PORT: SMTP_PORT,
          USER: SMTP_USER,
          PASS: SMTP_PASS,
          FROM: EMAIL_FROM,
          TO: EMAIL_TO,
          subject: `New RSVP from ${name}`,
          text,
        });
        console.log("Email sent:", info.messageId || info.response);
        notifyResult = info;
        notifyMethod = 'email';

      } catch (e) {
        console.error("EMAIL ERROR:", e);
      }
    }

    return res.json({
      message: 'RSVP received. Thank you!',
      description: 'We recorded your response.',
      notify: !!notifyResult,
      notify_method: notifyMethod
    });

  } catch (err) {
    console.error('Error handling RSVP:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`RSVP server listening on port ${port}`));
