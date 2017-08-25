var db = require("./models");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/wayfarer', {useMongoClient: true});

const CityData = [
  {
    city: 'San Francisco',
    country: 'United States',
    image: 'images/SFSunrise.jpg',
    description: 'San Francisco is the cultural, commercial, and financial center of Northern California. The consolidated city-county covers an area of about 47.9 square miles (124 km2) at the north end of the San Francisco Peninsula in the San Francisco Bay Area. It is the fourth-most populous city in California, and the 13th-most populous in the United States, with a 2016 census-estimated population of 870,887.',
    posts: [
      {
        user: "Garrick",
        title: "What a town!",
        text: "I am really impressed!",
        date: new Date()
      },
      {
        user: "Chris",
        title: "Amazing ice cream",
        text: "Try out Smittens.",
        date: new Date()
      }
    ]
  },
  {
    city: 'Seattle',
    country: 'United States',
    image: 'images/SeattleSunset.jpg',
    description: 'Seattle is a seaport city on the west coast of the United States and the seat of King County, Washington. With an estimated 704,352 residents as of 2016, Seattle is the largest city in both the state of Washington and the Pacific Northwest region of North America. In July 2013, it was the fastest-growing major city in the United States and remained in the Top 5 in May 2015 with an annual growth rate of 2.1%. In July 2016, Seattle was again the fastest-growing major U.S. city, with a 3.1% annual growth rate. The city is situated on an isthmus between Puget Sound (an inlet of the Pacific Ocean) and Lake Washington, about 100 miles (160 km) south of the Canada–United States border. A major gateway for trade with Asia, Seattle is the fourth-largest port in North America in terms of container handling as of 2015.',
    posts: [
      {
        user: "Stacy",
        title: "What a town!",
        text: "Great music, dudes have long hair.",
        date: new Date()
      },
      {
        user: "Chris",
        title: "Weather is blah.",
        text: "I missed the sun.",
        date: new Date()
      },
      {
        user: "Garrick",
        title: "Great music!",
        text: "Amazing vinyl stores.",
        date: new Date()
      }
    ]
  },
  {
    city: 'London',
    country: 'Great Britain',
    image: 'images/LondonDay.jpg',
    description: 'London is the capital and most populous city of England and the United Kingdom. Standing on the River Thames in the south east of the island of Great Britain, London has been a major settlement for two millennia. It was founded by the Romans, who named it Londinium. London\'s ancient core, the City of London, largely retains its 1.12-square-mile (2.9 km2) medieval boundaries. Since at least the 19th century, "London" has also referred to the metropolis around this core, historically split between Middlesex, Essex, Surrey, Kent, and Hertfordshire, which today largely makes up Greater London, a region governed by the Mayor of London and the London Assembly.',
    posts: [
      {
        user: "Garrick",
        title: "What a town!",
        text: "Very old.",
        date: new Date()
      },
      {
        user: "Stacy",
        title: "Beautiful architecture!",
        text: "I heard about that London Eye.",
        date: new Date()
      },
      {
        user: "Chris",
        title: "Blah weather and food.",
        text: "Meat pudding.",
        date: new Date()
      }
    ]
  },
  {
    city: 'Sydney',
    country: 'Australia',
    image: 'images/sydney_opera_house_australia_2-wallpaper-1920x1080.jpg',
    description: 'Sydney is the state capital of New South Wales and the most populous city in Australia and Oceania. Located on Australia\'s east coast, the metropolis surrounds the world\'s largest natural harbour and sprawls about 70 km (43.5 mi) on its periphery towards the Blue Mountains to the west, Hawkesbury to the north and Macarthur to the south. Sydney is made up of 658 suburbs, 40 local government areas and 15 contiguous regions. Residents of the city are known as "Sydneysiders". As at June 2016 Sydney\'s estimated population was 5,029,768.',
    posts: [
      {
        user: "Chris",
        title: "What a town!",
        text: "How about that opera house?",
        date: new Date()
      },
      {
        user: "Garrick",
        title: "Beautiful nature!",
        text: "Lots of wide open spaces. Eucalyptus trees.",
        date: new Date()
      },
      {
        user: "Stacy",
        title: "Dangerous wildlife.",
        text: "Everything wants to eat you.",
        date: new Date()
      }
    ]
  }
];

const users = [
  {
    name: "Chris",
    password: "password",
    hometown: "Aiea"
  },
  {
    name: "Stacy",
    password: "password",
    hometown: "Yuba City"
  },
  {
    name: "Garrick",
    password: "password",
    hometown: "Burlinghame"
  },
  {
    name: "Cory",
    password: "password"
  }
]

let userDictionary = {};
db.User.remove({}, function (err) {
  if (err) throw err;
  db.User.create(users, function (err, users) {
    users.forEach(user=>userDictionary[user.name] = user._id);
    //
    if (err) console.log(err);
    //
    CityData.forEach(city=>{
      city.posts.forEach(post=>{
        post.user = userDictionary[post.user] // should by _id
      });
    })
    //
    console.log(`Created ${users.length} users.`);
    // now create cities
    db.City.remove({}, function(err){
      if (err) {
        console.log(err);
        process.exit(1);
      };
      console.log('emptied out cities.');
      db.City.create(CityData, function(err, cities){
        if (err) { return console.log('ERROR', err); }
        console.log("all cities:", cities.length);
        process.exit(0);
      });
    });
  })
})
