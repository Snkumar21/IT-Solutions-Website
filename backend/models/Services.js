const mongoose = require('mongoose');
const ServiceSchema = new mongoose.Schema({
  title: {type:String, required:true},
  short: String,
  description: String,
  createdAt: {type:Date, default:Date.now}
});
module.exports = mongoose.model('Service', ServiceSchema);