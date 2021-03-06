var path    = require('path');
var express = require('express');
var app     = express();
var db      = require('./models/index');

var port = process.env.PORT || 8020;
app.set('port', port);

// Configuration
var env            = process.env.NODE_ENV || 'development';
var config         = require('./config.json')[env];

// Static files
app.use(express.static(path.join(__dirname, 'public')));

var router = express.Router();

app.use('/', router);

router.get('/rest/foobar', (req, res) => {
  res.send(JSON.stringify({ 'json_response': 'ok' }));
});

router.get('/user', (req, res) => {
  db.User.find({ where: { email: 'test@hh.fi' }})
    .then(function (user) {
      res.json(user);
    });
});

// start server
var http = require('http').Server(app);
http.listen(port, function() {
  console.log('*\n*\nExpress server listening on port '+ port + '.\n*\n*');
});