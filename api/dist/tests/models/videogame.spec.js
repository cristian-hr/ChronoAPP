"use strict";

var _require = require('../../db.js'),
    Videogame = _require.Videogame,
    conn = _require.conn;

var _require2 = require('chai'),
    expect = _require2.expect;

describe('Videogame model', function () {
  before(function () {
    return conn.authenticate()["catch"](function (err) {
      console.error('Unable to connect to the database:', err);
    });
  });
  describe('Validators', function () {
    beforeEach(function () {
      return Videogame.sync({
        force: true
      });
    });
    describe('Required data', function () {
      it('should throw an error if name is null', function (done) {
        Videogame.create({
          name: null,
          description: "Save the princess",
          platform: ["Nintendo"]
        }).then(function () {
          return done(new Error('It requires a valid name'));
        })["catch"](function () {
          return done();
        });
      });
      it('should throw an error if description is missing', function (done) {
        Videogame.create({
          name: 'Super Mario Bros',
          platform: ["Nintendo"]
        }).then(function () {
          return done("description is missing");
        })["catch"](function () {
          return done();
        });
      });
      it('should throw an error if name is missing', function (done) {
        Videogame.create({
          description: "Save the princess",
          platform: ["Nintendo"]
        }).then(function () {
          return done("name is missing");
        })["catch"](function () {
          return done();
        });
      });
      it('should throw an error if platform is missing', function (done) {
        Videogame.create({
          name: 'Super Mario Bros',
          description: "Save the princess"
        }).then(function () {
          return done("platform is missing");
        })["catch"](function () {
          return done();
        });
      });
      it('should throw an error if platform is not an Array', function (done) {
        Videogame.create({
          name: 'Super Mario Bros',
          description: "Save the princess",
          platform: "Nintendo"
        }).then(function () {
          return done("Platform must be an Array");
        })["catch"](function () {
          return done();
        });
      });
      it('should throw an error if genre is not an Array', function (done) {
        Videogame.create({
          name: 'Super Mario Bros',
          description: "Save the princess",
          platform: ["Nintendo"],
          genre: "Action"
        }).then(function () {
          return done("Genre must be an Array");
        })["catch"](function () {
          return done();
        });
      });
    });
  });
});