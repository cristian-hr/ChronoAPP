import server from './app';
import seq from './db.js';

// Syncing all the models at once.
seq.conn.sync({ truncate: true }).then(() => {
  server.listen(process.env.PORT, () => {
    console.log(`%s listening at ${process.env.PORT}`); // eslint-disable-line no-console
  });
});
