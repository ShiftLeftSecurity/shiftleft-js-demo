FROM node:14.21.3-bullseye-slim

WORKDIR /usr/src/app
COPY  ./ ./
RUN npm install

ENTRYPOINT [ "npm", "run", "start" ]
