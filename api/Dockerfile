
FROM node:14

WORKDIR /opt/app
COPY . .
RUN npm install

CMD ["node", "./dist/index.js"]




# FROM node:14

# RUN mkdir -p /opt/app

# RUN apt-get -q update && apt-get -qy install netcat
# RUN npm i npm@latest -g

# WORKDIR /usr/src/app

# WORKDIR /opt
# COPY package.json package-lock.json* ./
# RUN npm install && npm cache clean --force
# ENV PATH /opt/node_modules/.bin:$PATH

# WORKDIR /opt/app
# COPY . /opt/app

# # RUN chmod +x wait-for.sh
# CMD sh -c 'node ./dist/index.js'

# EXPOSE 5000




# COPY package*.json ./

# RUN ls

# RUN npm install
# RUN npm run build
# COPY . .

# EXPOSE 3001

# RUN npm start
# CMD ["node", "./dist/index.js"]

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