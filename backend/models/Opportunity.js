const mongoose = require('mongoose');
const OpportunitySchema = new mongoose.Schema({
  role: {type:String, required:true},
  type: {type:String, enum:['Training','Internship','Job'], default:'Internship'},
  duration: String,
  description: String,
  createdAt: {type:Date, default:Date.now},
  applicants: [{ name:String, email:String, resume:String, appliedAt: Date }]
});
module.exports = mongoose.model('Opportunity', OpportunitySchema);