const mongoose = require('mongoose');

const JobsSchema = new mongoose.Schema({
  JobID: { type: Number, required: true },
  Title: { type: String, required: true },
  CompanyID: { type: String, required: true },
  CompanyName: { type: String, required: true },
  CurrentStatus: {
    type: String,
    enum: ['Open', 'Close'],
  },
  Industry: { type: String },
  Remote: {
    type: String,
    enum: ['Remote', 'InPerson'],
  },
  StreetAddress: { type: String, required: true },
  City: { type: String, required: true },
  State: { type: String, required: true },
  Country: { type: String, required: true },
  Zip: { type: Number, min: 10000, max: 99999, required: true },
  PostedDate: { type: Date, required: true },
  JobDescription: { type: String, required: true },
  Responsibilities: { type: String, required: true },
  Qualifications: { type: String, required: true },
  ExpectedSalary: { type: Number, required: true },
  Votes: { type: Number, required: true },
  JobType: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Temporary'],
  },
});

module.exports = mongoose.model('jobs', JobsSchema);
