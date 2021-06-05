FROM node:14
WORKDIR /usr/src/app
COPY package*.json ./

# RUN npm install --global yarn
RUN yarn install

COPY . .

EXPOSE 6969

CMD [ "yarn", "build" ]
CMD [ "yarn", "start" ]