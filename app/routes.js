var Madlib = require('./models/madlib.js')

module.exports = function(app){
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

  //delete a madlib
  app.delete('/api/madlibs/:madlib_id', function(req, res) {

    Madlib.remove({
        _id : req.params.madlib_id
    },function(err) {
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

}
