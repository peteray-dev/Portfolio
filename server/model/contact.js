const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, 'a user must input firstname'],
      trim: true,
      unique: true,
    },
    lastname: {
      type: String,
      required: [true, 'a user must input lastname'],
      trim: true,
    },
    email: {
        type: String,
        required: [true, 'a user must input lastname'],
        trim: true,
      },
    subject: {
      type: String,
      required: [true, 'a user must input a subject'],
      trim: true,
    },
    message: {
      type: String,
      required: [true, 'a user must input a message'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', contactSchema);
module.exports = User;
