var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var ObjectiveSchema = new Schema({
  name: String,
  description: String,
  owner: {eid: String, name: String},
  category: String,
  contingency: String,
  tags: [{tid: String, name: String}],
  pobjective: this,//{oid: String},
  cobjectives: [this],
  progress: Number,
  createdOn: Date,
  keyresults: [{name: String, owner: {eid: String, name: String}, quarter: String, target: Number, actual: Number, units: {uid: String, value: String}, progress: Number}]
});

ObjectiveSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();  
  this.createdOn = currentDate;
  if (!this.createdOn)
    this.createdOn = currentDate;

  next();
});

mongoose.model('Objective', ObjectiveSchema);
