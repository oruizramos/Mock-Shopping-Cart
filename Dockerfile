# Use Node.js LTS image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json for backend
COPY apps/backend/package*.json ./

# Install dependencies (including dev dependencies for build)
RUN npm install

# Copy backend source code
COPY apps/backend/ .

# Build TypeScript to JavaScript
RUN npm run build

# Expose the port your server listens on
EXPOSE 4000

# Run the compiled server
CMD ["npm", "start"]