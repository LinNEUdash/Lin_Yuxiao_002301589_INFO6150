const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    companyName: { type: String, required: true },
    jobTitle: { type: String, required: true },
    description: { type: String, required: true },
    salary: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Job', jobSchema);
