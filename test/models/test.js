// Unix-like:  ./test ./node_modules/.bin/mocha -u tdd test/models/test.js
// Windows:    .\node_modules\.bin\mocha -u tdd test\models\test.js

var should = require('should');
var db = require('../../models/index');
var colors = require('colors');

// cache the sequelize logging output till after all the tests have run
var logOutput = '\n';

var log = function (msg) {
  logOutput += msg + '\n';
};

db.sequelize.options.logging = log;

describe('Model tests', function () {
  this.slow(2000);
  this.timeout(15000);
  // recreate the database before each test to ensure isolation
  beforeEach(function (done) {
    db.sequelize.sync({force: true})
      .then(function () {
          done();
      });
  });
  // after all the tests have run, output all the sequelize logging and recreate the database
  after(function (done) {
    db.sequelize.sync({force: true})
      .then(function () {
          console.log(logOutput.gray);
          done();
      });
  });
  require('./user')(db);
});
