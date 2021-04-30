const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  StudentID: { type: Number, required: true },
  Name: { type: String },
  ProfilePicURL: { type: String },
  Email: { type: String, required: true },
  PhoneNo: { type: Number },
  Website: { type: String },
  StreetAddress: { type: String },
  City: { type: String },
  State: { type: String },
  Country: { type: String },
  Zip: { type: Number, min: 10000, max: 99999 },
  AboutMe: { type: String },
  CurrentJobTitle: { type: String },
  Skills: [{ type: String }],
  ResumePrimary: { type: String },
  Resumes: [{ type: String }],
  FavouriteJobs: [{ type: String }],
  HelpfullGeneralReviews: [Number],
  HelpfullInterviewReviews: [Number],
  JobStatus: {
    type: String,
    enum: [
      'Select',
      'Not looking',
      'Not looking, but open',
      'Casually looking',
      'Actively looking',
    ],
    default: 'Select',
  },
  Ethnicity: {
    type: String,
    enum: [
      'Indigenous American or Alaska Native',
      'East Asian',
      'South Asian',
      'Southeast Asian',
      'Native Hawaiian or Other Pacific Islander',
      'Middle Eastern',
      'Black or African American',
      'Hispanic or Latinx',
      'White',
      'Prefer to Self Describe',
      'Prefer Not to Say',
    ],
    default: 'Prefer Not to Say',
  },
  JobType: [
    {
      type: String,
    },
  ],
  PreferredJobTitle: { type: String },
  TargetSalary: { type: Number },
  OpentoRelocation: { type: Boolean, default: false },
  WorkRemotely: { type: Boolean, default: false },
  Industry: { type: String },
  Race: [
    {
      type: String,
    },
  ],

  Gender: {
    type: String,
    enum: ['Male', 'Female', 'Non-Binary', 'Prefer Not to Say'],
    default: 'Prefer Not to Say',
  },
  AcceptedReviewCount: { type: Number },
  Disability: {
    type: String,
    enum: ['Yes', 'No', 'Prefer Not to Say'],
    default: 'Prefer Not to Say',
  },
  VeteranStatus: {
    type: String,
    enum: ['Yes', 'No', 'Prefer Not to Say'],
    default: 'Prefer Not to Say',
  },

  AppliedJobs: [String],
});

module.exports = mongoose.model('student', StudentSchema);
