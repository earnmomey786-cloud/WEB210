FROM node:18-alpine

WORKDIR /app

# Copiar package files
COPY package*.json ./

# Instalar dependencias
RUN npm install --omit=dev

# Copiar el resto del código
COPY . .

# Build the app
RUN npm run build

# Expose port
EXPOSE 3000

# Start command
CMD ["npm", "start"]
