import server from './app';
import seq from './db.js';

// Syncing all the models at once.
seq.conn.sync({ truncate: true }).then(() => {
  server.listen(process.env.PORT || 3001, () => {
    console.log(`%s listening at ${process.env.PORT || 3001}`); // eslint-disable-line no-console
  });
});
