const mongoose = require('mongoose');

const Salaryschema = new mongoose.Schema({
  SalaryReviewID: { type: Number },
  CompanyID: { type: String, required: true },
  StudentID: { type: Number, required: true },
  CompanyName: { type: String, required: true },
  Status: {
    type: String,
    enum: ['Not Approved', 'Approved', 'Disapproved'],
    required: true,
  },
  DatePosted: { type: Date, required: true },
  BaseSalary: { type: Number, required: true },
  Bonuses: { type: Number, required: true },
  JobTitle: { type: String, required: true },
  Years: { type: Number, required: true },
  StreetAddress: { type: String, required: true },
  City: { type: String, required: true },
  State: { type: String, required: true },
  Zip: { type: Number, min: 10000, max: 99999, required: true },
});
mongoose.set('useCreateIndex', true);
Salaryschema.index({ SalaryReviewID: 1 }, { unique: true });
module.exports = mongoose.model('salaryreview', Salaryschema);
