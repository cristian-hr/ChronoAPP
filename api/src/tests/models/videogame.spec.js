const { Videogame, conn } = require('../../db.js');
const { expect } = require('chai');

describe('Videogame model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Videogame.sync({ force: true }));
    
    describe('Required data', () => {
      it('should throw an error if name is null', (done) => {
        Videogame.create({
          name: null,
          description: "Save the princess",
          platform: ["Nintendo"]
        })
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });

      it('should throw an error if description is missing', (done) => {
        Videogame.create({           
          name: 'Super Mario Bros',
          platform: ["Nintendo"]
        })
          .then(() => done("description is missing"))
          .catch(() => done());
      });

      it('should throw an error if name is missing', (done) => {
        Videogame.create({
          description: "Save the princess",
          platform: ["Nintendo"]
        })
          .then(() => done("name is missing"))
          .catch(() => done());
      });

      it('should throw an error if platform is missing', (done) => {
        Videogame.create({ 
          name: 'Super Mario Bros',
          description: "Save the princess"
        })
          .then(() => done("platform is missing"))
          .catch(() => done());
      });

      it('should throw an error if platform is not an Array', (done) => {
        Videogame.create({
          name: 'Super Mario Bros',
          description: "Save the princess",
          platform: "Nintendo"
        })
          .then(() => done("Platform must be an Array"))
          .catch(() => done());
      });

      it('should throw an error if genre is not an Array', (done) => {
        Videogame.create({
          name: 'Super Mario Bros',
          description: "Save the princess",
          platform: ["Nintendo"],
          genre: "Action"
        })
          .then(() => done("Genre must be an Array"))
          .catch(() => done());
      });
    });
  });
});