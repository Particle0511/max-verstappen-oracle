# Stage 1: Build Stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Production Stage
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/package*.json ./
RUN npm install --production
COPY --from=builder /app/dist ./dist
# Corrected COPY command: Copy the schema to the dist folder where the app runs
COPY --from=builder /app/src/graphql/schema.graphql ./dist/graphql/schema.graphql
CMD ["npm", "start"]
