let mongoose = require ("mongoose");
let Schema = mongoose.Schema;

let UserSchema = new Schema({
  name: String,
  image: String,
  password: String,
  hometown: String
})

module.exports = mongoose.model('User', UserSchema);
