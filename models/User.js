const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  phoneNumber: { type: String, required: true },
  coursesEnrolled: [
    {
      courseName: String
    }
  ]
});

module.exports = mongoose.model('User', userSchema);
