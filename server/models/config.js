var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var ConfigSchema = new Schema(
  {domain: String, value: String}
);

mongoose.model('Config', ConfigSchema);
