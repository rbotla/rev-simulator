

var mongoose = require('mongoose'),
Agreement = mongoose.model('Agreement');

class AgreementCtrl {
  addNewAgreementInternal(agreement, onSuccess, onError){
    Agreement.create(agreement, function (err, obj) {
      if (err)  return onError(err);
      return onSuccess(obj);
    });
  }

  onAddNewAgreement(req, res) {
    this.addNewAgreementInternal(req.body, res.send, res.send);
  }

  getAgreementById(req, res) {
    const eid = req.query.id;
    Agreement.find({'id': eid}, function(err, result) {
      return res.send(result);
    });
  }

  getAllAgreements(req, res) {
    Agreement.find({}, function(err, result) {
      return res.send(result);
    });
  }

}

module.exports = new AgreementCtrl();