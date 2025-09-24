# syntax=docker/dockerfile:1.7

# 1) Base image with PNPM
FROM node:20-alpine AS base
ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH
RUN corepack enable && corepack prepare pnpm@10.17.1 --activate

# 2) Dependencies (better layer caching)
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

# 3) Builder
FROM deps AS build
WORKDIR /app
COPY . .
# Next.js 15 supports standalone output via next start by default
RUN pnpm build

# 4) Runner (production)
FROM node:20-alpine AS runner
ENV NODE_ENV=production
ENV HOST=0.0.0.0
WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -G nodejs -u 1001

# Copy necessary files
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public

USER 1001
EXPOSE 3000

CMD ["node", "server.js"]
