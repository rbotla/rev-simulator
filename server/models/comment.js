var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var CommentSchema = new Schema({
	refid: String,
	type: String,
	persons: [String],
	comment: String,
	commentedby: String,
	datetime: Date
});

CommentSchema.pre('save', function(next) {
  var currentDate = new Date();  
  this.datetime = currentDate;
  next();
});

mongoose.model('Comment', CommentSchema);

