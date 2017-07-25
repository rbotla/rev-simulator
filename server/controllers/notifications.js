var mongoose = require('mongoose'),
Notification = mongoose.model('Notification');

class NotificationCtrl {
  addNewNotification(notification, onSuccess, onError){
    Notification.create(notification, function (err, obj) {
      if (err)  return onError(err);
      return onSuccess(obj);
    });
  }

  onAddNewNotification(req, res) {
    this.addNewNotification(req.body, res.send, res.send);
  }

  getNotificationByPerson(req, res) {
    const eid = req.query.eid;
    Notification.find({'personid': eid}, function(err, result) {
      return res.send(result);
    });
  }

}

module.exports = new NotificationCtrl();
