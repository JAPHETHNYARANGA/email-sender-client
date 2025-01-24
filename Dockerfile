#use official node.js runtime
FROM node:22-alpine

#set working diectory in container
WORKDIR /app

#copy package files to container
COPY package*.json .

#install dependencies
RUN npm install

#copy rest of the application code
COPY . .

#expose port the app runs on
EXPOSE 5003

#Define command to run your application
CMD ["node", "./src/server.js"]