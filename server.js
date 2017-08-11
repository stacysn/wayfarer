//import dependencies
var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    db = require('./models')

//create instances
var app = express(),
    router = express.Router();

// set port to env or 3001
var port = process.env.API_PORT || 3001;

//db config
mongoose.connect('mongodb://localhost/wayfarer');

//config API to use bodyParser and look for JSON in req.body
app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());
app.use('/api', router);

//Prevent CORS errors
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  //Remove caching
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

//set route path and init API
router.get('/', function(req,res) {
  res.json({message: 'API Initialized!'});
});

//adding the /cities route from our /api router
router.route('/cities')
  //retrieve all posts from the db
  .get(function(req, res){  // GET all cities
    //looks at our Post Schema
    db.City.find(function(err, posts){
      if (err)
        res.send(err);
        res.json(posts);
    })
  })
  .post(function(req, res){
    var city = new db.City();
    city.city = req.body.city; //change to name?
    city.country = req.body.country;
    city.img = req.body.img;

    city.save(function(err){
      if (err)
        res.send(err);
        res.json({message: 'City post success!'});
    });
  });

router.route('/cities/:id')
  //retrive one specific id
  .get(function(req, res){  // GET a city
    db.City.findById(req.params.id, function(err, city){
      if (err)
        res.send(err);
        res.json(city);
    })
  })
  .delete(function(req, res){ // DELETE a city
    db.City.findOneAndRemove({_id: req.params.cityId}, function(err){
      if (err){
        res.status(500);
      }
      res.json({message: 'City Deleted!'})
    })
  })

router.route('/cities/:cityId/posts')
  .get(function(req, res){  // GET all posts
    db.City.findById(req.params.cityId, function(err, city) {
      if (err) res.json(err);
      res.json(city.posts);
    });
  })
  .post(function(req, res){ // POST a new post
    db.City.findById(req.params.cityId, function(err, city){
      const doc = {
        user: req.body.user,
        text: req.body.text,
        date: new Date()
      };
      var newPost = new db.Post(doc);
      console.log("NEW POST", newPost);
      city.posts.unshift(newPost);
      city.save(function(err, savedCity){
        if (err) res.json(err);
        res.json(newPost);
      });
    });
  })

//route to delete specific post by id
router.route('/cities/:cityId/posts/:postId')
  .delete(function(req, res){
    db.City.findById(req.params.cityId, function(err, city){
      let correctPost = city.posts.id(req.params.postId)
        console.log("req.params.postId", req.params.postId);
      if(correctPost){
        correctPost.remove();
        city.save(function(err, saved){
          console.log("Removed ", correctPost);
          res.status(200).send();
        })
      }
      else{
        return res.status(404).send("OH NO!!");
      }
    })
  })
  .get(function (req, res) { // get one post
    console.log("GET one post")
    db.City.findById(req.params.cityId, function (err, city) {
      if (err) return res.json(err);
      res.json(city.posts.id(req.params.postId));
    });
  })

//start server
app.listen(port, function() {
  console.log("API IS RUNNING ON PORT " + port);
})
