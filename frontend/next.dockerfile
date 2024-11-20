# Use Node.js as the base image
FROM node:20 AS base

# Set the working directory
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package.json and pnpm-lock.yaml (if exists) into the container
COPY package.json pnpm-lock.yaml* ./

# Install dependencies using pnpm
RUN pnpm install --frozen-lockfile

# Copy the rest of your application code into the container
COPY . .

# Build the application
RUN pnpm run build

# Run the application
CMD ["pnpm", "run", "dev"]
