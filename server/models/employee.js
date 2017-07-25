var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var EmployeeSchema = new Schema({
  name: String,
  email: String,
  manager: String,
  title: String,
  url: String
});

EmployeeSchema.pre('save', function(next) {
  var currentDate = new Date();  
  this.updated_at = currentDate;
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

mongoose.model('Employee', EmployeeSchema);
