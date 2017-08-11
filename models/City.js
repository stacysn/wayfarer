let mongoose = require ("mongoose");
let Schema = mongoose.Schema;
let Post = require('./Post.js')

let CitySchema = new Schema({
  city: String,
  country: String,
  image: String,
  description: String,
  posts: [Post.schema]
})

module.exports = mongoose.model('CitySchema', CitySchema);
