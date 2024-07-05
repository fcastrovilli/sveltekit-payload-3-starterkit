FROM node:20-alpine3.19 AS image

FROM image AS preparer
WORKDIR /app

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk update
RUN apk add --no-cache libc6-compat

COPY . .

FROM preparer AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install
RUN pnpm run build

FROM image AS prod
WORKDIR /app

ENV NODE_ENV=production
ENV PAYLOAD_CONFIG_PATH=dist/payload.config.js

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=build --chown=nextjs:nodejs /app/.next/standalone /app
COPY --from=build --chown=nextjs:nodejs /app/.next/static /app/.next/static

EXPOSE 3000

CMD node server.js