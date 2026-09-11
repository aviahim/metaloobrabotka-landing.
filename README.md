# Токарка МКС — готовый сайт для GitHub Pages

В корне проекта находится `index.html`, поэтому GitHub Pages может публиковать сайт непосредственно из корня репозитория.

## Публикация
1. Создайте репозиторий GitHub.
2. Загрузите **содержимое этой папки**, а не сам ZIP-файл.
3. GitHub → Settings → Pages → Deploy from branch → `main` → `/ (root)`.
4. Сайт откроется по адресу GitHub Pages.

## Форма заявок
Frontend отправляет заявку на Cloudflare Worker. Worker одновременно отправляет заявку и файлы в Telegram, MAX и E-mail.

Перед публикацией замените `API_URL` в `app.js` на URL вашего Worker. Секреты Telegram/MAX/Resend хранятся только в Worker и не должны попадать в GitHub.
