var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var AgreementSchema = new Schema({
  id: String,
  customerName: String,
  accountId: String,
  documentTitle: String,
  agreementType: String,
  agreementName: String,
  parentAgreementId: String,
  startDate: Date,
  endDate: Date,
  contractTerm: Number,
  autoRenew: String,
  noticePeriod: Number,
  contractRenewalTerm: Number,
  contractRenewalLimit: Number,
  agreementLineIds: [ String ]
});

mongoose.model('Agreement', AgreementSchema);



