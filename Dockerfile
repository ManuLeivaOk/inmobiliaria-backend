# --- ETAPA 1: Construcción ---
FROM node:20-alpine AS builder
WORKDIR /app

# Copiamos archivos de dependencias
COPY package*.json ./

# Instalamos todas las dependencias (incluyendo las de desarrollo para poder compilar)
RUN npm ci

# Copiamos el resto del código fuente (incluyendo tu nuevo main.ts)
COPY . .

# Compilamos el proyecto adentro de Docker
RUN npm run build

# --- ETAPA 2: Ejecución ---
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./

# Instalamos solo las dependencias de producción para que la imagen pese poco
RUN npm ci --only=production

# Le robamos la carpeta /dist a la etapa de compilación
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main"]
