let mongoose = require ("mongoose");
let Schema = mongoose.Schema;

let UserSchema = new Schema({
  username: String,
  password: String,
  hometown: String,
  id: String
})

module.exports = mongoose.model('User', UserSchema);
