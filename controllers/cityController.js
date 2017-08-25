var db = require('../models');

function getAllCities(req, res){
  /*
  db.City.find(function(err, posts){
  if (err)
    res.send(err);
    res.json(posts);
  })
  */
  db.City.find((err, cities)=>{
    let countDown = 0;  //first we have to count up
    cities.forEach(city=>{
      countDown += city.posts.length;
    })
    cities.forEach(city=>{
      db.User.populate(city.posts, {path: 'user'}, (err, posts) => {
        if (err) res.status(500).json(err);
        countDown -= posts.length;  // tally off we populated these posts
        city.posts = posts;
        if (countDown === 0) {
          res.json(cities);
        }
      })
    })
  });
}

function postCity(req,res){  //POST one city
  var city = new db.City();
  city.city = req.body.city;
  city.country = req.body.country;
  city.img = req.body.img;

  city.save(function(err){
    if (err)
      res.send(err);
      res.json({message: 'City post success!'});
  });
}

  function getOne(req, res){  // GET a city
    db.City.findById(req.params.cityId, function(err, city){
      if (err)
        res.send(err);
        res.json(city);
      })
  }

  function destroy(req, res){ // DELETE a city
    db.City.findOneAndRemove({_id: req.params.cityId}, function(err){
      if (err){
        res.status(500);
      }
      res.json({message: 'City Deleted!'})
    })
  }

  function update(req, res) {  // UPDATE a city
    db.City.findById(req.params.id, function (err, city) {
      if (err) return res.json(err);
      for (let i in req.body) {
        city[i] = req.body[i];
      }
      city.save(function (err, city) {
        if (err) return res.json(err);
        res.json(city);
      })
    })
  }

  module.exports = {
    getAllCities: getAllCities,
    postCity: postCity,
    getOne: getOne,
    destroy: destroy,
    update: update
  }
