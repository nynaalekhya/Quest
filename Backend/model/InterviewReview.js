const mongoose = require('mongoose');

const Interviewschema = new mongoose.Schema({
  InterviewReviewID: { type: Number },
  CompanyID: { type: String, required: true },
  StudentID: { type: Number, required: true },
  CompanyName: { type: String, required: true },
  Status: {
    type: String,
    enum: ['Not Approved', 'Approved', 'Disapproved'],
  },
  Helpful: { type: Number, default: 0, required: true },
  DatePosted: { type: Date, required: true },
  OverallExperience: {
    type: String,
    enum: ['Positive', 'Negative', 'Neutral'],
    required: true,
  },
  JobTitle: { type: String, required: true },
  Description: { type: String, required: true },
  Difficulty: {
    type: Number,
    required: true,
  },
  OfferStatus: {
    type: String,
    enum: ['No', 'Yes, but I declined', 'Yes, and I accepted'],
    required: true,
  },
  InterviewQuestions: { type: String, required: true },
  Answers: { type: String, required: true },
  StreetAddress: { type: String, required: true },
  City: { type: String, required: true },
  State: { type: String, required: true },
  Zip: { type: Number, min: 10000, max: 99999, required: true },
});
mongoose.set('useCreateIndex', true);
Interviewschema.index({ InterviewReviewID: 1 }, { unique: true });
module.exports = mongoose.model('interviewreview', Interviewschema);
