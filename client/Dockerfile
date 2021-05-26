# FROM node:14

# WORKDIR /app
# COPY . .
# RUN npm install

# CMD ["npm", "start"]



FROM node:14

RUN mkdir -p /opt/app
WORKDIR /opt/app

RUN npm i npm@latest -g

WORKDIR /opt
COPY package.json package-lock.json* ./
RUN npm install && npm cache clean --force
ENV PATH /opt/node_modules/.bin:$PATH

WORKDIR /opt/app
COPY . /opt/app

CMD ["npm", "start"]

# EXPOSE 3000


# FROM node:14

# LABEL version="1.0"
# # LABEL description="This is the base docker image for the Tweet Sentiment Analysis frontend react app."
# # LABEL maintainer = ["danielmurph8@gmail.com", "dylanedwards290@gmail.com"]

# WORKDIR /app

# COPY ["package.json", "./"]

# RUN npm install --production

# COPY . .

# EXPOSE 3000

# CMD ["npm", "start"]