FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json ./
COPY yarn.lock ./
COPY ./public/* ./public/
COPY ./src/* ./src/
COPY tsconfig.json ./

RUN yarn install
RUN yarn run build
RUN yarn global add serve

# Bundle app source
COPY . .

EXPOSE 3001

CMD [ "serve", "-p", "3001", "-s", "./ui/build" ]
