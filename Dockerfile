# First stage: Build the application
FROM node:alpine3.18 AS build

# Set build arguments
ARG REACT_APP_NODE_ENV
ARG BASE_URL

# Set environment variables
ENV REACT_APP_NODE_ENV=$REACT_APP_NODE_ENV
ENV BASE_URL=$BASE_URL

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy application code
COPY . .

# Build the application
RUN npm run build

# Second stage: Serve the build artifacts with NGINX
FROM nginx:1.25.5-alpine

# Set working directory
WORKDIR /usr/share/nginx/html

# Remove existing files
RUN rm -rf *

# Copy build artifacts from the first stage
COPY --from=build /app/build .

# Expose port 80
EXPOSE 80

# Set NGINX entrypoint
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
