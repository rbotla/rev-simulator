var mongoose = require('mongoose'),
Employee = mongoose.model('Employee');

exports.findAll = function(req, res){
  Employee.find({},function(err, results) {
    return res.send(results);
  });
};

exports.findById = function(req, res){
  var id = req.query.eid;
  Employee.findOne({'_id':id},function(err, result) {
    if (err) res.send(err);
    return res.send(result);
  });
};

exports.findByName = function(req, res){
  var str = req.query.name;
  if (str.length === 0 ) return res.send([]);

  Employee.find({'name': {'$regex': str, $options: 'i'} },function(err, result) {
    return res.send(result);
  });
};

exports.add = function(req, res) {
  Employee.create(req.body, function (err, employee) {
    if (err) return console.log(err);
    return res.send(obj);
  });
}

exports.import = function(req, res){
  Employee.create(
    { "name": "Ravi Botla", "email": "rbotla@changehealthcare.com", "manager": "bennie.jones@McKesson.com" },
    { "name": "Dean Quach", "email": "dquach@changehealthcare.com", "manager": "jguillebeaux@changehealthcare.com" },
    { "name": "Holt Zeidler", "email": "HZeidler@changehealthcare.com", "manager": "jguillebeaux@changehealthcare.com" },
    { "name": "Keith Weinheimer", "email": "kweinheimer@changehealthcare.com", "manager": "bennie.jones@McKesson.com" },
    { "name": "Angela Hacksel-Newmark", "email": "AHACKSELNEWMARK@changehealthcare.com", "manager": "jguillebeaux@changehealthcare.com" },
    { "name": "Holly Hon", "email": "hhon@changehealthcare.com", "manager": "jguillebeaux@changehealthcare.com" },
    { "name": "Brian North", "email": "brian.north@changehealthcare.com", "manager": "jguillebeaux@changehealthcare.com" },
    { "name": "Bennie Jones", "email": "bennie.jones@McKesson.com", "manager": "jguillebeaux@changehealthcare.com" },
    { "name": "John Guillebeaux", "email": "jguillebeaux@changehealthcare.com", "manager": "achoy@changehealthcare.com" },
    { "name": "Alex Choy", "email": "achoy@changehealthcare.com", "manager": "NdeCrescenzo@changehealthcare.com" },
    { "name": "Neil De Crescenzo", "email": "NdeCrescenzo@changehealthcare.com" }
  , function (err) {
    if (err) return console.log(err);
    return res.sendStatus(202);
  });
};
