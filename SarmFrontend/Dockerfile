FROM node:12.18.2

ARG ENV=prod
ARG APP=angular-docker
ARG NODE_OPTIONS=--max-old-space-size=4096
ENV ENV ${ENV}
ENV APP ${APP}

WORKDIR /app
COPY ./ /app/
EXPOSE 4200
# Instala y construye el Angular App
RUN npm i
