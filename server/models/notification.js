var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var NotificationSchema = new Schema({
	actionurl: String,
	notification: String,
	personid: String,
	datetime: Date,
	status: String
});

mongoose.model('Notification', NotificationSchema);
