const mongoose = require('mongoose');

const StaticSchema = new mongoose.Schema({
  JobSearchDropDowns: [String],
  JobFilterInJobTab: [String],
  Ethnicity: [String],
  Gender: [String],
  State: [String],
  Status: [String],
  Country: [String],
  VeteranStatus: [String],
  Disability: [String],
  JobType: [String],
  reviews: [
    {
      Date: { type: Date },
      reviewcount: { type: Number },
    },
  ],
});

module.exports = mongoose.model('static_data', StaticSchema);
