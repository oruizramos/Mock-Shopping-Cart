# Use Node LTS base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy files
COPY . .

# Install dependencies
RUN npm install

# Expose port
EXPOSE 4000

# Start the server
CMD ["npm", "run", "dev"]
