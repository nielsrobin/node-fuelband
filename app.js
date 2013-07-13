var express = require('express');
var app = express();
var http = require('http');
var _ = require('underscore');
var server = require('http').createServer(app)
  , engine = require('ejs-locals');

app.engine('ejs', engine);
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
  app.locals.pretty = true;
});

app.get('/', function(req, res){ res.render('index'); });

server.listen(process.env.PORT || 3000);