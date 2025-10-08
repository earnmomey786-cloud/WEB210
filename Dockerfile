FROM node:18-alpine

WORKDIR /app

# Copiar package files
COPY package*.json ./

# Instalar TODAS las dependencias (necesitamos vite para el build)
RUN npm install

# Copiar el resto del código
COPY . .

# Build the app
RUN npm run build

# Limpiar devDependencies después del build
RUN npm prune --production

# Expose port
EXPOSE 3000

# Start command
CMD ["npm", "start"]
