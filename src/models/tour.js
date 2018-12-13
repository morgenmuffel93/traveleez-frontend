const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tourSchema = new Schema({
  title: String,
  date: String,
  time: String,
  description: String,
  location: String,
  expertise: String,
  duration: Number,
}, {
  userId: {
    type: ObjectID,
    ref: 'User'
  }
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
