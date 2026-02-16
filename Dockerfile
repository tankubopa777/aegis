FROM oven/bun:1 AS base
WORKDIR /app

COPY package.json bun.lockb* ./
RUN bun install --frozen-lockfile

COPY . .

EXPOSE 8000
CMD ["bun", "run", "src/index.ts"]