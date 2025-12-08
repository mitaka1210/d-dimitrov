# Използвай официален Node образ (стабилна версия)
FROM node:20-alpine

# Работна директория
WORKDIR /app

# Копирай package.json и lock файла
COPY package*.json ./

# Инсталирай зависимости
RUN npm install

# Копирай останалия код
COPY . .

# Копирай .env.production вътре в контейнера
COPY .env.production .env.production

# Билдни Next.js приложението
RUN npm run build

# Експонирай порта
EXPOSE 3000

# Стартирай приложението с .env.production
CMD ["npx", "dotenv", "-e", ".env.production", "--", "next", "start"]