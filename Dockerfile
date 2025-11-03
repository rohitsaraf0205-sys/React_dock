# Stage 1 — build with Node (glibc-based image)
FROM node:22-bullseye-slim AS build
WORKDIR /app

# Install deps required for building some native modules (optional but safe)
RUN apt-get update && apt-get install -y build-essential python3 make g++ && rm -rf /var/lib/apt/lists/*

# Copy package metadata first (cache npm installs)
COPY package*.json ./

# Install dependencies
RUN npm ci --no-audit --prefer-offline

# Copy rest of app sources
COPY . .

# Build the app (Vite)
RUN npm run build

# Stage 2 — serve with nginx
FROM nginx:stable-alpine AS runtime
# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy built app from build stage
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
