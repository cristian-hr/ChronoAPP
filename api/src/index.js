import server from './app';
import db from './db.js';

// Syncing all the models at once.

async function startServer() {

  async function createConnection() {
    db.conn.sync({ truncate: true }).then(() => {
      server.listen(process.env.PORT || 3001, () => {
        console.log(`%s listening at ${process.env.PORT || 3001}`); // eslint-disable-line no-console
      });
    });
  }

  let retries = 5;
  while (retries) {
    try {
      await createConnection()
      break;
    } catch (error) {
      console.log(error)
      retries -= 1;
      console.log(`retries left ${retries}`)
      await new Promise( res => setTimeout(res, 5000))
    }
  }
}

startServer()
