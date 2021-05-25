FROM node:14

# LABEL version="1.0"
# LABEL description="This is the base docker image for the Tweet Sentiment Analysis backend API."
# LABEL maintainer = ["danielmurph8@gmail.com", "dylanedwards290@gmail.com"]

WORKDIR /usr/src/app

COPY package*.json ./

# RUN ls

RUN npm install
# RUN npm run build
COPY . .

EXPOSE 3001

RUN npm start
CMD ["node", "./dist/index.js"]

# FROM node:12.13.0-alpine
# RUN mkdir -p /opt/app
# WORKDIR /opt/app
# RUN adduser -S app
# COPY . .
# RUN npm install
# RUN chown -R app /opt/app
# USER app
# EXPOSE 3001
# CMD [ "node", "./dist/index.js" ]