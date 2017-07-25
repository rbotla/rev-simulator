var mongoose = require('mongoose'),
Config = mongoose.model('Config');

exports.findAll = function(req, res){
  Config.find({"domain": req.query.domain},function(err, results) {
    return res.send(results);
  });
};

exports.findByName = function(req, res) {
  const value = req.query.value;
  const domain = req.query.domain;
  Config.find({ 'domain': domain, 'value': {'$regex': value, $options: 'i'} },function(err, result) {
    return res.send(result);
  }); 
};

exports.findById = function(req, res){
  var id = req.params.id;
  Config.findOne({'_id':id},function(err, result) {
    return res.send(result);
  });
};

exports.add = function(req, res) {
  Config.create(req.body, function (err, obj) {
    if (err) return console.log(err);
    return res.send(obj);
  });
}

exports.import = function(req, res){
  Config.create(
    { "domain": "units", "value": "Percentage" },
    { "domain": "units", "value": "Yes(1) / No(0)" },
    { "domain": "units", "value": "Sales" },
    { "domain": "units", "value": "Revenue" }
  , function (err) {
    if (err) return console.log(err);
    return res.sendStatus(202);
  });
};
