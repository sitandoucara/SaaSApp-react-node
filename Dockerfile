# Stage 1: Build the Ionic app
FROM node:16-alpine as build
WORKDIR /app
COPY package*.json /app/
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

# Stage 2: Serve the built app using Nginx
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/www/ /usr/share/nginx/html/

# Install Node.js and npm in the Nginx container
RUN apk add --no-cache nodejs npm

CMD ["nginx", "-g", "daemon off;"]