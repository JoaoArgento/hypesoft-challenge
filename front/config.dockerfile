# 1. Build da aplicação
FROM node:20-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 2. Container final com Nginx
FROM nginx:alpine

# Remove configuração default
RUN rm /etc/nginx/conf.d/default.conf

# Copia nossa configuração
COPY nginx.conf /etc/nginx/conf.d/

# Copia o build do React
COPY --from=build /app/dist /usr/share/nginx/html

# Expõe a porta
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
