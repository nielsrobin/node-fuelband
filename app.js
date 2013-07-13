var express = require('express');
var app = express();
var http = require('http');
var _ = require('underscore');
var server = require('http').createServer(app)
  , engine = require('ejs-locals');
var request = require('request');


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

app.get('/api/v1/fuel/:token', function(req, res){
	fuel_request(req.params.token, res, 'https://api.nike.com/me/sport');
});

app.get('/api/v1/fuel/activities/:token', function(req, res){
	fuel_request(req.params.token, res, 'https://api.nike.com/me/sport/activities');
});

app.get('/api/v1/fuel/activities/:id/:token', function(req, res){
	fuel_request(req.params.token, res, 'https://api.nike.com/me/sport/activities/' + req.params.id);
});

function fuel_request(token, res, url){
	var options = {
	  uri: url + '?access_token=' + token,
	  method: 'GET',
	  headers: {
	      'appid': 'fuelband',
	      'accept': 'application/json'
	  }
	};

	request(options, function (error, response, body) {
	  	res.json(JSON.parse(body));
	});
}

server.listen(process.env.PORT || 3000);