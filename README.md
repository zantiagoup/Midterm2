# ThroneFind

Midterm II · Web Application Development (Fall 2026) · Team 4: Alejandra + Zantiago.

Game of Thrones character catalog. A Node + Express server queries two public APIs and serves the frontend (Bootstrap).

## How to run

Requires Node 18 or newer (uses native `fetch`).

```bash
npm install
npm start
```

Open http://localhost:3001. To use another port: `PORT=4000 npm start`.

## Endpoints

| Route | Returns |
|---|---|
| `GET /api` | List `[{ id, name, image }]` |
| `GET /api?search=jon` | List filtered by name or ID. No results: 404 |
| `GET /api/characters/:id` | Detail with `born`, `died`, `titles`, `aliases`, `crest`, `prevId`, `nextId`. Non-numeric ID: 400. Unknown ID: 404 |

Errors return `{ error: { message, status } }`.

## Structure

```
server.js            starts Express
routes/thrones.js    /api endpoints
services/gotApi.js   calls to the external APIs
middleware/errors.js JSON error handler
public/              frontend (index.html, js/app.js, css, img)
```

## Sources

- Characters and images: [ThronesAPI](https://thronesapi.com).
- Birth, death, titles and aliases: [An API of Ice and Fire](https://anapioficeandfire.com).
- Crests in `public/img/crests` (Wikimedia Commons): Stark, Lannister and Baratheon by George R. R. Martin (CC BY 4.0); Targaryen by Abjiklam (CC BY 3.0).
- Claude helped with the documentation (thanks Mythos)
