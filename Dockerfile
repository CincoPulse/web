FROM node:18-alpine

WORKDIR /app

COPY . .
RUN npm install -g pnpm
RUN pnpm install
RUN pnpm build

ENV PORT=3003
EXPOSE 3003

CMD ["pnpm", "start"]
