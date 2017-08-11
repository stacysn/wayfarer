var db = require("./models");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/wayfarer');

var CityData =[];
  CityData.push({
      city: 'San Francisco',
      country: 'United States',
      image: 'public/images/SFSunrise.jpg',
  });
  CityData.push({
      city: 'Seattle',
      country: 'United States',
      image: 'public/images/SeattleSunset.jpg',
  });
  CityData.push({
      city: 'London',
      country: 'Great Britain',
      image: 'public/images/LondonDay.jpg',
  });
  CityData.push({
      city: 'Sydney',
      country: 'Australia',
      image: 'public/images/sydney_opera_house_australia_2-wallpaper-1920x1080.jpg',
  });


db.City.remove({}, function(err){
    // code in here runs after all delays are removed
  db.City.create(CityData, function(err, cities){
    // code in here runs after all delays are created
    if (err) { return console.log('ERROR', err); }
    console.log("all cities:", cities.length);
  });
});
