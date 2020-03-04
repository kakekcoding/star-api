FROM node:10.16.3

WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .

EXPOSE 8080

CMD npm start