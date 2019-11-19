FROM node:12.9.0-alpine

WORKDIR /var/www/html

RUN yarn cache clean -f

COPY . .

EXPOSE ${NODE_PORT}

CMD [ "yarn", "dev" ]