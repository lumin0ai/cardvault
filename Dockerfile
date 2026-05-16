# Use official Node.js image
FROM node:20

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files
COPY . .

# Expose port (adjust if your app uses another port)
EXPOSE 5000

# Start the app
CMD ["npm", "run", "dev"]
