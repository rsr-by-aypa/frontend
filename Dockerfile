# Stage 1: Build React application
FROM node:14 AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Setup Nginx server to serve static files
FROM nginx:alpine

# Copy build output from previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to the Docker host
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
