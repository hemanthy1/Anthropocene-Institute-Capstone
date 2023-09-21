FROM node:18
WORKDIR .
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3030
RUN npm install -g serve
CMD ["serve", "-s", "build", "-l", "3000"]