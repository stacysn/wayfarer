var db = require('../models');

function index(req, res) {
  db.User.find({}, (err, users) => {
    if (err) res.json(err);
    res.json(users);
  })
}

function create (req, res) {
  db.User.create(req.body, (err, user) => {
    if (err) res.json(err);
    console.log('created new user', user);
    res.json(user);
  })
}

function show (req, res) {
  db.User.findById(req.params.id, (err, user) => {
    if (err) res.json(err);
    console.log('found user', user);
    res.json(user);
  })
}

function update (req, res) {
  db.User.findById(req.params.id, (err, user) => {
    if (err) res.json(err);
    for (let i in req.body) {
      user[i] = req.body[i];
    }
    user.save(function (err, user) {
      if (err) res.json(err);
      console.log('successfully updated user id:', user._id)
      res.json(user);
    })
  })
}

function login (req, res) {
  db.User.find({name: req.body.name}, (err, users) => {
    let user;
    if (users.length > 0) {
      user = users[0];
      if (err || user.password !== req.body.password) {
        console.log('credentials invalid');
        if (err) console.log('there was an error', err);
        if (user.password !== req.body.password) console.log('bad password');
        // don't tell users why authentication failed
        res.status(400);
        user = null;
      }
    } else {
      res.status(400);
      user = null;
      console.log('user named', req.body.username, 'not found');
    }
    res.json(user);
  });
}

module.exports = {
  index: index,
  create: create,
  show: show,
  update: update,
  login: login
}
