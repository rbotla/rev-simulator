var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var AgreementLineSchema = new Schema({
  agreementId: String,
  agreementLineId: String,
  contractProductName: String, 
  productId: String, 
  feeType: String, 
  feeRate: Number, 
  unitOfMeasure: String, 
  pricingNotes: String, 
  startDate: Date,
  endDate: Date,
  revenueContractId: String
});

mongoose.model('AgreementLine', AgreementLineSchema);