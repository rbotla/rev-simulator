var mongoose = require('mongoose'),
Comment = mongoose.model('Comment');
var notificationsCtrl =  require('./notifications');

class CommentCtrl {
  addNewComment(req, res) {
    Comment.create(req.body, function (err, obj) {
      if (err) {
        console.log(err);
        return res.send(err);
      }

      req.body.persons.forEach( person => {
        const notification = {
          actionurl: '/objectives/'+req.body.refid,
          notification: 'You got a new message - ' + req.body.comment,
          personid: person,
          datetime: new Date(),
          status: 'Unread'
        };

        notificationsCtrl.addNewNotification(notification, console.log, console.error);
      });

      return res.send(obj);
    });
  }

  // getCommentsById() {

  // }
  
  // getCommentsByPerson() {

  // }

  getCommentsByRefId(req, res) {
    const refId = req.query.refid;
    Comment.find({'refid': refId}, function(err, result) {
      return res.send(result);
    });
  }

}

module.exports = new CommentCtrl();
