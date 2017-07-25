var mongoose = require('mongoose'),
User = mongoose.model('User');
Employee = mongoose.model('Employee');
var config = require('../config');
var jwt = require('jsonwebtoken');

class UserCtrl {
	register(req, res) {
		User.create(req.body, function(err, user) {
			if(err) return res.send(err);
			res.json(user);
		});
	}

	login(req, res) {
		User.findOne({username: req.body.username, password: req.body.password}, function(err, user) {
			if(err) return res.send(err);

			if(user) {
				var token = jwt.sign(user,config.secret);
				Employee.findOne({email: req.body.username}, function(error, emp) {
	        res.json({
	        	token: token,
	        	empId: emp._id
	        })
				})

			} else {
		    // res.status(403).send({
		    //     message: 'No User found.' 
		    // });
			}
		});
	}
}

module.exports = new UserCtrl();