FROM node:22-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Install ffmpeg
RUN apt-get update && apt-get install -y ffmpeg && rm -rf /var/lib/apt/lists/*

FROM base AS build
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install
RUN pnpm run build

FROM base AS production
WORKDIR /usr/src/app
ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=512"
COPY --from=build /usr/src/app/.output ./.output
COPY --from=build /usr/src/app/package.json ./package.json

EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/api/hello').then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"
CMD [ "node", ".output/server/index.mjs" ]
