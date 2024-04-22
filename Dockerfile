# First stage: Build the application
FROM node:alpine3.18 AS build

ARG REACT_APP_NODE_ENV
ARG base_url

ENV REACT_APP_NODE_ENV=$REACT_APP_NODE_ENV
ENV base_url=$base_url

WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

# Second stage: Serve the build artifacts with nginx
FROM nginx:1.23-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf *
COPY --from=build /app/build .
EXPOSE 80
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
