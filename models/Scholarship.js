const mongoose = require('mongoose');

const scholarshipSchema = new mongoose.Schema({
  scholarshipHolder: {
    type: String,
    required: true,
    trim: true
  },
  percentage: {
    type: Number,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Scholarship', scholarshipSchema);
