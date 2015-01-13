FROM node:0.10.35-slim
MAINTAINER APIT - 20142c - Grupo6

COPY ./poc-app/ /var/poc/

WORKDIR /var/poc

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
