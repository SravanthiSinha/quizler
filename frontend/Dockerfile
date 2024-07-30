# Use Node.js 18 Alpine as the base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Set environment variables
ENV CI=true
ENV PORT=3000

# Expose port 3000
EXPOSE 3000

# Start the application in development mode
CMD ["npm", "start"]