const mongoose = require('mongoose');

const tranSchema = new mongoose.Schema({
  userId: String,
  bookId: String,
  isComplete: Boolean,
});

const Tran = mongoose.model('Tran', tranSchema, 'trans');

module.exports = Tran;