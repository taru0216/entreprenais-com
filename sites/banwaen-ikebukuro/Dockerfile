# === Stage 1: Astro build ===
# Astro 6 requires Node >= 22.12.0
FROM node:22-alpine AS builder
WORKDIR /build
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .
RUN npm run build
# Output: /build/dist/

# === Final Stage: Caddy ===
FROM caddy:2-alpine

COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=builder /build/dist/ /srv/

EXPOSE 8080
