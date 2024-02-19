# Use an official Node.js runtime as the base image
FROM node:18

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

# Expose the port that the app will run on
EXPOSE 3000

# Define the command to run the app
CMD [ "serve", "-s", "build"]