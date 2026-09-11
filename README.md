# Токарка МКС — единая отправка заявок

Готовая связка: GitHub Pages + Cloudflare Worker. Интерфейс переработан в современном индустриальном стиле: крупная типографика, чертёжная графика, акцентный синий, адаптивная верстка и единый CTA.

На сайте только одна кнопка **«Отправить»**.

После отправки заявка с именем, телефоном, e-mail, комментарием и чертежами автоматически направляется **одновременно** в:
- рабочий чат **Telegram**;
- рабочий чат **MAX**;
- рабочую **электронную почту**.

Выбор канала для клиента убран.

Секреты хранятся только в Cloudflare Worker:
`MAX_BOT_TOKEN`, `MAX_CHAT_ID`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, `RESEND_API_KEY`, `MAIL_FROM`, `MAIL_TO`.

## Деплой

```bash
cd worker
npm install
npx wrangler secret put MAX_BOT_TOKEN
npx wrangler secret put MAX_CHAT_ID
npx wrangler secret put TELEGRAM_BOT_TOKEN
npx wrangler secret put TELEGRAM_CHAT_ID
npx wrangler secret put RESEND_API_KEY
npx wrangler secret put MAIL_FROM
npx wrangler secret put MAIL_TO
npm run deploy
```

После деплоя вставьте URL Worker в `frontend/app.js` и укажите адрес GitHub Pages в `worker/wrangler.toml`.

Старый токен MAX, опубликованный в переписке, использовать нельзя — выпустите новый.

Никогда не размещайте токены MAX/Telegram или API-ключ Resend во frontend или публичном GitHub.
