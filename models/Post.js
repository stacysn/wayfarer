let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let User = require('./User');

let PostSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  title: String,
  text: String,
  date: Date
})

module.exports = mongoose.model('Post', PostSchema);
