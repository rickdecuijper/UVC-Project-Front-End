FROM node:20-alpine AS builder

WORKDIR /app

# Copy package.json and lockfile first
COPY package*.json ./

# Install all dependencies (including devDependencies)
RUN npm ci --include=dev 

# Copy the rest of the project
COPY . .

# Build the project
RUN npm run build

# ---------- Production stage ----------
# Stage 2: Serve
FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/build /usr/share/nginx/html

# Optional: copy custom nginx config
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
