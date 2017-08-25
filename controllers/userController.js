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
  db.User.findById(req.body.id, (err, user) => {
    if (err) res.json(err);
    console.log('found user', user);
    res.json(user);
  })
}

module.exports = {
  index: index,
  create: create,
  show: show
}
