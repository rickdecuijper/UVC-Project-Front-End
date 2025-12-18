# -------------------
# Build stage
# -------------------
FROM node:20 AS builder
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build SvelteKit app
RUN npm run build

# -------------------
# Run stage
# -------------------
FROM node:20 AS runner
WORKDIR /app

# Copy built output
COPY --from=builder /app/.svelte-kit/output ./output

# Copy package.json & install only production deps
COPY package*.json ./
RUN npm install --omit=dev

# Expose default SvelteKit Node port
EXPOSE 4173

# Start the Node server
CMD ["node", "./output/server/app.js"]
