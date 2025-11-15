# RSVP backend and notifications

This folder contains a minimal Node/Express server that accepts RSVP submissions and forwards a notification.

Files
- `index.js` - Express server with POST `/api/rsvp` endpoint. The server will try to forward notifications via:
  - Twilio WhatsApp API (if `TWILIO_*` env vars are set)
  - Telegram Bot API (if `TELEGRAM_*` env vars are set)

Why both options?
- WhatsApp (Twilio or other WhatsApp Business providers) is reliable but requires an account and may be paid.
- Telegram is free and quick to set up and supports sending into groups via bot.

Important note about WhatsApp groups
- The official WhatsApp Business APIs generally don't allow sending messages to arbitrary WhatsApp groups. You can send messages to individual phone numbers (organizers) via the API. If your goal is to notify a group chat, Telegram/Slack/Discord are much easier and fully supported via bots/webhooks.

Setup
Setup
1. Install dependencies (inside the `server` folder):

```sh
npm install
```

2. Copy `.env.example` to `.env` and set values (choose one or more notification providers):

- SMTP/Email (recommended for organizers): set `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `EMAIL_FROM`, `EMAIL_TO`.
  - For Gmail, generate an App Password and use `smtp.gmail.com:587` with your email as user.

- Telegram: create a bot via @BotFather and set `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID`.

- Twilio (WhatsApp): set `TWILIO_*` env vars as needed.

3. Run locally: `npm start` (from the `server` folder).

Deploy
- Vercel/Netlify: use serverless functions or a small Node app. On Vercel, place the endpoint as an API function.
- Heroku/Render: deploy as a small Node web service.

Testing
Use curl to POST a test RSVP:

```sh
curl -X POST http://localhost:3000/api/rsvp \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"a@b.com","attending":"yes","guests":"1","message":"Hello"}'
```

Follow-ups
- If you want the server as serverless functions (Vercel/Netlify) I can convert the endpoint to that format.
- If you prefer Twilio for WhatsApp I can include sample Twilio console setup steps and template text.
