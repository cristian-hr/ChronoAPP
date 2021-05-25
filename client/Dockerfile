FROM node:14

LABEL version="1.0"
# LABEL description="This is the base docker image for the Tweet Sentiment Analysis frontend react app."
# LABEL maintainer = ["danielmurph8@gmail.com", "dylanedwards290@gmail.com"]

WORKDIR /app

COPY ["package.json", "./"]

RUN npm install --production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]