FROM node:18
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 6060
EXPOSE 3000
CMD ["npm", "start"]