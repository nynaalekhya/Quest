const mongoose = require('mongoose');

const Photoschema = new mongoose.Schema({
  ID: { type: Number, required: true },
  CompanyID: { type: String, required: true },
  StudentID: { type: String, required: true },
  PhotoURL: { type: String, required: true },
  DateUploaded: { type: Date, required: true },
  CompanyName: { type: String, required: true },
  Status: {
    type: String,
    enum: ['Not Approved', 'Approved', 'Disapproved'],
    required: true,
  },
});
mongoose.set('useCreateIndex', true);
Photoschema.index({ ID: 1 }, { unique: true });
module.exports = mongoose.model('photo', Photoschema);
