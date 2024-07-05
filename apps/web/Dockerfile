FROM node:20-alpine3.19 AS image

FROM image AS preparer
WORKDIR /app

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

COPY . .

FROM preparer AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod

FROM preparer AS builder
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install
RUN pnpm run check
RUN pnpm run build

FROM image AS prod
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 svelte
USER svelte

# Copy from repo
COPY --chown=svelte:nodejs ./package.json ./package.json
COPY --chown=svelte:nodejs ./tsconfig.json ./tsconfig.json
COPY --chown=svelte:nodejs ./payload ./payload

# Copy from build
COPY --chown=svelte:nodejs --from=builder /app/build ./build
COPY --chown=svelte:nodejs --from=builder /app/.svelte-kit ./.svelte-kit
COPY --chown=svelte:nodejs --from=prod-deps /app/node_modules ./node_modules

EXPOSE 3000

CMD node build