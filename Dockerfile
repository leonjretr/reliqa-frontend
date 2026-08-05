# syntax=docker.io/docker/dockerfile:1

FROM node:22-alpine AS base

# ---------------------------------------------------------------- deps
FROM base AS deps
# https://github.com/nodejs/docker-node — why libc6-compat is needed on alpine
RUN apk add --no-cache libc6-compat
WORKDIR /app

# pnpm-workspace.yaml must come along, or pnpm resolves a different tree in the
# container than it does on the host. The version is pinned by package.json's
# "packageManager" field, which corepack reads.
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc* ./
RUN corepack enable pnpm && pnpm install --frozen-lockfile

# ---------------------------------------------------------------- builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
RUN corepack enable pnpm && pnpm run build

# ---------------------------------------------------------------- runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# The standalone bundle carries its own minimal node_modules and a server.js;
# static assets are not included in it and must be copied alongside.
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

# 9050 matches the dev server, so the port is the same wherever it runs.
EXPOSE 9050
ENV PORT=9050
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
