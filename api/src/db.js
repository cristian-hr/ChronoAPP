import { config } from "dotenv"
import { Sequelize } from 'sequelize';
import { readdirSync } from 'fs';
import { basename as _basename, join } from 'path';

config()

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT } = process.env;

if (process.env.POSTGRES_PASSWORD) {

  let dbConfig = {
    user: process.env.POSTGRES_USER,
    pass: process.env.POSTGRES_PASSWORD,
    name: process.env.POSTGRES_USER,
    host: "db",
  }

  var sequelize = new Sequelize(`postgres://${dbConfig.user}:${dbConfig.pass}@${dbConfig.host}:/${dbConfig.name}`, {
    logging: false,
    native: false,
  });

}
else {
  var sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
    logging: false,
    native: false,
  });
}

const basename = _basename(__filename);
const modelDefiners = [];
readdirSync(join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => { modelDefiners.push(require(join(__dirname, '/models', file))) });

modelDefiners.forEach(model => model.default(sequelize));
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

export default {
  ...sequelize.models,
  conn: sequelize,
};
