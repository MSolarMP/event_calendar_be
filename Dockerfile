# Use the official Node.js image.
FROM node:18

# Create and set the working directory.
WORKDIR /app

# Copy package.json and package-lock.json.
COPY package*.json ./

# Install dependencies.
RUN npm install

# Copy the rest of the application code.
COPY . .

# Expose port 3001.
EXPOSE 3001

# Run the app
CMD ["npm", "run", "start:prod"]

#172.18.0.3
