const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  ID: { type: Number, required: true },
  CompanyID: { type: String, required: true },
  StudentID: { type: String, required: true },
  CompanyName: { type: String, required: true },
  Pros: { type: String, required: true },
  Cons: { type: String, required: true },
  Description: { type: String, required: true },
  Rating: { type: Number, required: true },
  EmployeeStatus: {
    type: String,
    enum: ['Current', 'Former'],
    required: true,
  },
  Status: {
    type: String,
    enum: ['Not Approved', 'Approved', 'Disapproved'],
    required: true,
  },
  Helpful: { type: Number, required: true, default: 0 },
  CEOApproval: { type: Boolean, required: true },
  JobType: {
    type: String,
    enum: ['FullTime', 'PartTime', 'Contract', 'Intern', 'Freelance'],
    required: true,
  },
  Recommended: { type: Boolean, required: true },
  JobTitle: { type: String, required: true },
  Headline: { type: String, required: true },
  DatePosted: { type: Date, required: true },
  Response: { type: String },
  Favorite: { type: Number, required: true },
});
mongoose.set('useCreateIndex', true);
ReviewSchema.index({ ID: 1 }, { unique: true });
module.exports = mongoose.model('generalreview', ReviewSchema);
