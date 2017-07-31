//setup
var express = require('express')
var app = express()
var mongoose = require('mongoose')
var morgan = require('morgan')
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

//config
mongoose.connect( process.env.MONGODB_URI || 'mongodb://localhost/madmadlibs')
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

//define modules
var Madlib = mongoose.model('Madlib', {
  story : String,
});

//routes

app.get('/api/madlibs', function(req, res){

	Madlib.find(function(err, madlibs){

    if(err){
      res.send(err)
    }

    res.json(madlibs)

	})

})

app.post('/api/madlibs', function(req, res){
  Madlib.create({
    story: req.body.story
  }, function(err, madlib){
    if(err){
      res.send(err)
    }

    Madlib.find(function(err, madlibs){
      if(err){
        res.send(err)
      }

      res.json(madlibs)

    })

  })

})

// delete a todo W.I.P
app.delete('/api/madlibs/:madlib_id', function(req, res) {
  Madlib.remove({
      _id : req.params.madlib_id
  },function(err, madlibs) {
      if (err){
        res.send(err);
      }

      // get and return all the todos after you delete another
      Madlib.find(function(err, madlibs) {
        if (err){
          res.send(err)
        }
        res.json(madlibs);
      });

    });

});

//listen
app.listen(process.env.PORT || 8080);
console.log("App listening on port 8080");
