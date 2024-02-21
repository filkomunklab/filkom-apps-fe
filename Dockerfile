# Use an official Node.js runtime as the base image
FROM node:18 as build-stage

# Set the environment variable
ARG REACT_APP_IMAGES_PATH
ARG REACT_APP_BASE_URL_API

ENV REACT_APP_IMAGES_PATH=$REACT_APP_IMAGES_PATH
ENV REACT_APP_BASE_URL_API=$REACT_APP_BASE_URL_API

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN yarn install

# Copy the entire project to the container
COPY . .

# Build the React app
RUN yarn build

# Install serve to run the app
RUN yarn global add serve

FROM nginx:latest

# Copy the build folder from the previous stage to the new stage
COPY --from=build-stage /app/build /usr/share/nginx/html

# Copy the nginx configuration file to the container
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the port that the app will run on
EXPOSE 80

# Define the command to run the app
CMD ["nginx", "-g", "daemon off;"]