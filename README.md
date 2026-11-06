# MachineMal — frontend

The website at **[machinemal.eu](https://machinemal.eu)**: a small personal site with image search, saved images and user accounts.

## Features

- **Image search** powered by the Unsplash API
- **Saved images**, for logged-in users and for guests (a guest account is tied to a cookie)
- **User accounts**: sign up, log in, change password, delete account
- **Contact form** via EmailJS
- Help, cookie policy and privacy policies for the Android apps
- Download links for the [Tetris](https://github.com/AlexanderStubMichelsen/Tetris) and [ONotes](https://github.com/AlexanderStubMichelsen/ONotes) Android apps

## Tech

React 18 · Vite 5 · React Router 6 · React Bootstrap · react-helmet-async (page titles and share previews)

The backend is [MyPostgresApi](https://github.com/AlexanderStubMichelsen/MyPostgresApi), served from the same domain under `/api`.

## Run locally

```bash
npm install
npx vite              # dev server on http://localhost:5173
```

Create a `.env` file for local development:

```bash
VITE_API_URL=http://localhost:8080/api   # where the API runs
VITE_UNSPLASH_ACCESS_KEY=...
VITE_EMAILJS_SERVICE_ID=...
VITE_EMAILJS_TEMPLATE_ID=...
VITE_EMAILJS_PUBLIC_KEY=...
VITE_YOUTUBE_API_KEY=...                  # optional
VITE_RAPIDAPI_KEY=...                     # optional
VITE_WEATHER_API_KEY=...                  # optional
```

> `VITE_` variables end up in the browser bundle, so only use keys that are meant to be public, and restrict them to your domain in each provider's dashboard.

Tests: `npm test` · Production build: `npm run build:azure` (a plain `vite build`; the `build` script is Windows-specific).

## Deployment

The `server` branch deploys automatically. On every push, GitHub Actions ([deploy-server.yml](.github/workflows/deploy-server.yml)) builds the site and copies `dist/` to the server, where Caddy serves it with HTTPS. The `VITE_*` values come from repository secrets.

Server setup and hosting details live in a separate private repo.
