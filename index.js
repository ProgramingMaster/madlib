//setup
var express = require('express')
var app = express()
var mongoose = require('mongoose')
var port = process.env.PORT || 8080
var database = require('./config/database.js')
  var morgan = require('morgan')
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

//config
//connects to mongo
mongoose.connect(database.url)
//serves up public
app.use(express.static(__dirname + '/public'));
//?
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());


//routes
require('./app/routes.js')(app)


//listen
app.listen(port);
console.log("App listening on port " + port);
