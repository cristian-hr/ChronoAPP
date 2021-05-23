"use strict";

/* eslint-disable import/no-extraneous-dependencies */
var _require = require('chai'),
    expect = _require.expect;

var session = require('supertest-session');

var app = require('../../app.js');

var _require2 = require('../../db.js'),
    Videogame = _require2.Videogame,
    conn = _require2.conn;

var agent = session(app);
var videogame = {
  name: 'Super Mario Bros',
  description: "Save the princess",
  platform: ["Nintendo"]
};
var videogameSinName = {
  description: "Save the princess",
  platform: ["Nintendo"]
};
var videogameSinDesc = {
  name: 'Super Mario Bros',
  platform: ["Nintendo"]
};
var videogameSinPlat = {
  name: 'Super Mario Bros',
  description: "Save the princess"
};
describe('Videogame routes', function () {
  before(function () {
    return conn.authenticate()["catch"](function (err) {
      console.error('Unable to connect to the database:', err);
    });
  });
  beforeEach(function () {
    return Videogame.sync({
      force: true
    }).then(function () {
      return Videogame.create(videogame);
    });
  }); //Test para obtener resultados de juegos con y sin queris

  describe('GET /videogames', function () {
    xit('should get 200', function () {
      return agent.get('/videogames').expect(200);
    }).timeout(0);
    xit('should get 200 if name query is added', function () {
      return agent.get('/videogames?name=Warcraft').expect(200);
    }).timeout(0);
    xit('should get 200 if filtroGenero query is added', function () {
      return agent.get('/videogames?filtroGenero=Action').expect(200);
    }).timeout(0);
    xit('should get 200 if filtroGenero and name queries are added', function () {
      return agent.get('/videogames?name=Halo&filtroGenero=Action').expect(200);
    }).timeout(0);
  }); //Test para los detalles 

  describe('GET /videogame/:id', function () {
    xit('should get 200 if an ID is added in params', function () {
      return agent.get('/videogame/100').expect(200);
    }).timeout(0);
  }); //Test para los generos

  describe('GET /genres', function () {
    xit('should get 200', function () {
      return agent.get('/videogame/100').expect(200);
    }).timeout(0);
  }); //Test para la creación de juegos

  describe('POST /videogame', function () {
    xit('should get 200', function () {
      return agent.post('/videogame').send(videogame).expect(200);
    }).timeout(0);
    xit('should get 200 if game is added', function () {
      return agent.post('/videogame').send(videogame).then(function (res) {
        expect(res.body.msg).to.be.equal("Juego agregado");
      });
    }).timeout(0);
    xit('should get 422 if name misses', function () {
      return agent.post('/videogame').send(videogameSinName).then(function (res) {
        expect(res.body.error).to.be.equal("Falta el nombre");
      });
    }).timeout(0);
    xit('should get 422 if description misses', function () {
      return agent.post('/videogame').send(videogameSinDesc).then(function (res) {
        expect(res.body.error).to.be.equal("Falta la descripción");
      });
    }).timeout(0);
    xit('should get 422 if platform misses', function () {
      return agent.post('/videogame').send(videogameSinPlat).then(function (res) {
        expect(res.body.error).to.be.equal("Falta la plataforma/s");
      });
    }).timeout(0);
  });
});