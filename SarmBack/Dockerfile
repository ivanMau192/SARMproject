FROM node:12.18.2
WORKDIR /usr/src/app/
COPY ./package.json ./
COPY ./tsconfig.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm","run","dev"]