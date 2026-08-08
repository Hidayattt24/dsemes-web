# ─────────────────────────────────────────────────────────────────────────────
# DSMES Web — Multi-stage Dockerfile (Next.js standalone)
#
# Stage 1 (builder):  installs deps, builds the Next.js app in standalone mode.
# Stage 2 (runner):   minimal Node.js image with only the standalone output.
#
# NEXT_PUBLIC_* vars are inlined at build time — pass them as build args.
# ─────────────────────────────────────────────────────────────────────────────

# ── Stage 1: Build ────────────────────────────────────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL:-http://localhost:8080/api/v1}

COPY . .

RUN npm run build

# ── Stage 2: Runtime ──────────────────────────────────────────────────────────
FROM node:22-alpine AS runner

WORKDIR /app

RUN addgroup -S -g 1001 nodejs && adduser -S -u 1001 -G nodejs nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

ENV NODE_ENV=production
ENV PORT=3000
ENV TZ=Asia/Jakarta

EXPOSE 3000

USER nextjs

CMD ["node", "server.js"]
