# Stage 1: Build the React app
FROM node:18 AS builder

# Set environment variables
ARG DISABLE_ESLINT_PLUGIN
ARG REACT_APP_IMAGES_PATH
ARG REACT_APP_BASE_URL_API
ARG REACT_APP_OBE_BASE_URL_API

ENV DISABLE_ESLINT_PLUGIN=$DISABLE_ESLINT_PLUGIN
ENV REACT_APP_IMAGES_PATH=$REACT_APP_IMAGES_PATH
ENV REACT_APP_BASE_URL_API=$REACT_APP_BASE_URL_API
ENV REACT_APP_OBE_BASE_URL_API=$REACT_APP_OBE_BASE_URL_API

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN yarn install --production

# Copy the entire project to the container
COPY . .

# Build the React app
RUN yarn build

# Stage 2: Serve the React app
FROM node:18-slim

# Install serve to run the app
RUN yarn global add serve

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the built React app from the builder stage
COPY --from=builder /usr/src/app/build ./build

# Expose the port that the app will run on
EXPOSE 3000

# Define the command to run the app
CMD ["serve", "-s", "build"]
