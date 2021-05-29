import express, { json, urlencoded } from 'express';
import routes from './routes/index.js';
import cors from "cors"
import './db-test';

const server = express();

server.use(cors())
server.use(urlencoded({ extended: true, limit: '50mb' }));
server.use(json({ limit: '50mb' }));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

export default server;
