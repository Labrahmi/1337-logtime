# Use Node.js LTS version as the base image
FROM node:lts-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to the working directory
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install
# or, if you prefer Yarn
# RUN yarn install

# Copy the entire app to the container's working directory
COPY . .

# Build the Next.js app
RUN npm run build
# or, for Yarn
# RUN yarn build

# Set environment variable for production
ENV NODE_ENV=production

# Expose the required port (Next.js default is 3000)
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
# or, for Yarn
# CMD ["yarn", "start"]
