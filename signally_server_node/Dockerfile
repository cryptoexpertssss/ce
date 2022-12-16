FROM node:14.18.1-bullseye-slim

WORKDIR /usr/src/app

COPY package.json ./
COPY tsconfig.json ./
COPY .env ./
COPY src ./src

# RUN npm ci --only=production
# RUN npm install --only=production
RUN npm install
RUN npm run build

ENV NODE_ENV=production

# Run the web service on container startup.
CMD [ "node", "./build/index.js" ]
