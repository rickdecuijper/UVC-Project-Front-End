# Build stage
FROM node:20 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Run stage
FROM node:20 AS runner
WORKDIR /app

# Copy only built result + production dependencies
COPY --from=builder /app/build ./build
COPY package*.json ./
RUN npm install --omit=dev

EXPOSE 4173
CMD ["npm", "run", "preview"]
