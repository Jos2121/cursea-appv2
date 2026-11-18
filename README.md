# Qustom Go

Plataforma de canciones personalizadas: landing pública, formulario de pedido, panel administrativo, generación de audio con OpenRouter y renderizado de video con FFmpeg.

- **Landing:** `/landing`
- **Pedido:** `/crea-tu-cancion`
- **Panel admin:** `/` (login con `ADMIN_PASSWORD`)
- **Medios de pago:** `/medios-pago`

## Stack

- React 18 + Vite + TypeScript + Tailwind + shadcn/ui
- Nitro (server routes en `server/`)
- PostgreSQL (`pg`) — tablas `"MediaJob"` y `"CustomTemplate"`
- FFmpeg (render de videos verticales 1080x1920)

## Desarrollo local

```bash
pnpm install
pnpm dev        # http://localhost:8080
```

Variables de entorno en `.env` (ver `.env.example`).

## Deploy en Easypanel (desde GitHub)

1. En Easypanel: **Create → App** y conecta este repositorio (`Jos2121/qustom-go`, rama `main`).
2. **Build:** método `Dockerfile` (ruta `Dockerfile`).
3. **Puerto:** `3000`.
4. **Variables de entorno:**

   | Variable | Requerida | Descripción |
   | --- | --- | --- |
   | `DATABASE_URL` | Sí | Cadena de conexión PostgreSQL |
   | `OPENROUTER_API_KEY` | Sí | Generación de audio |
   | `OPENROUTER_MODEL` | No | Default: `google/lyria-3-pro-preview` |
   | `TELEGRAM_BOT_TOKEN` | No | Notificaciones / confirmación de pagos |
   | `TELEGRAM_CHAT_ID` | No | Chat destino de comprobantes |
   | `ADMIN_PASSWORD` | Sí | Clave del panel admin |
   | `WHATSAPP_PAYMENT_NUMBER` | No | WhatsApp para pagos (o `VITE_WHATSAPP_PAYMENT_NUMBER`) |
   | `NEXT_PUBLIC_APP_URL` | No | URL pública del sitio (referer de OpenRouter) |
   | `NODE_OPTIONS` | No | Ya definido en el `Dockerfile` (`--max-old-space-size=512`) |
   | `FFMPEG_CONCURRENCY` | No | Renders simultáneos, default `1` |
   | `FFMPEG_THREADS` | No | Hilos por render, default `2` |
   | `FFMPEG_TIMEOUT_MS` | No | Timeout por render, default `180000` |
   | `PG_POOL_MAX` | No | Conexiones del pool, default `10` |

5. **Volumen persistente:** monta un volumen en `/usr/src/app/public/media`
   para conservar audios, videos, portadas y comprobantes entre despliegues.
6. **Healthcheck:** `GET /api/hello`.
7. Activa **Auto Deploy** en Easypanel: cada `git push` a `main` reconstruye y publica.

### Recomendaciones de recursos

- 1–2 GB de RAM para el contenedor.
- Si el servidor tiene 2 GB+, puedes usar `NODE_OPTIONS=--max-old-space-size=768` y `FFMPEG_CONCURRENCY=2`.

## Actualizaciones en vivo

```bash
git add -A
git commit -m "descripcion del cambio"
git push origin main
```

Easypanel detecta el push y redespliega automáticamente.
