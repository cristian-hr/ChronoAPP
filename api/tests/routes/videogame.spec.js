/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Videogame, conn } = require('../../src/db.js');

const agent = session(app);
const videogame = {
  name: 'Super Mario Bros',
  description: "Save the princess",
  platform: ["Nintendo"]
};

const videogameSinName = {
  description: "Save the princess",
  platform: ["Nintendo"],
};

const videogameSinDesc = {
  name: 'Super Mario Bros',
  platform: ["Nintendo"],
};

const videogameSinPlat = {
  name: 'Super Mario Bros',
  description: "Save the princess"
};

describe('Videogame routes', () => {
  before(() => conn.authenticate().catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Videogame.sync({ force: true }).then(() => Videogame.create(videogame)));
  
    //Test para obtener resultados de juegos con y sin queris
    describe('GET /videogames', () => {
    xit('should get 200', () =>      
      agent.get('/videogames').expect(200)
    ).timeout(0);

    xit('should get 200 if name query is added', () =>      
       agent.get('/videogames?name=Warcraft').expect(200)      
    ).timeout(0);

    xit('should get 200 if filtroGenero query is added', () =>       
       agent.get('/videogames?filtroGenero=Action').expect(200)
    ).timeout(0);

    xit('should get 200 if filtroGenero and name queries are added',  () => 
      agent.get('/videogames?name=Halo&filtroGenero=Action').expect(200)
    ).timeout(0);

  });

  //Test para los detalles 
  describe('GET /videogame/:id', () => {
    xit('should get 200 if an ID is added in params', () =>      
      agent.get('/videogame/100')
      .expect(200)
    ).timeout(0);    
  });

  //Test para los generos
  describe('GET /genres', () => {
    xit('should get 200', () =>      
      agent.get('/videogame/100')
      .expect(200)
    ).timeout(0);    
  });

  //Test para la creación de juegos
  describe('POST /videogame', () => {
    xit('should get 200', () =>      
      agent.post('/videogame')
      .send(videogame)
      .expect(200)
    ).timeout(0); 

    xit('should get 200 if game is added', () =>      
      agent.post('/videogame')
      .send(videogame)
      .then((res) =>{
        expect(res.body.msg).to.be.equal("Juego agregado")
      })      
    ).timeout(0);

    xit('should get 422 if name misses', () =>      
      agent.post('/videogame')
      .send(videogameSinName)
      .then((res) =>{
        expect(res.body.error).to.be.equal("Falta el nombre")
      })      
    ).timeout(0);

    xit('should get 422 if description misses', () =>      
      agent.post('/videogame')
      .send(videogameSinDesc)
      .then((res) =>{
        expect(res.body.error).to.be.equal("Falta la descripción")
      })
    ).timeout(0);

    xit('should get 422 if platform misses', () =>      
      agent.post('/videogame')
      .send(videogameSinPlat)
      .then((res) =>{
        expect(res.body.error).to.be.equal("Falta la plataforma/s")
      })
    ).timeout(0);
    
    
  });
});