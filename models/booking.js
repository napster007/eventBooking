const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookingShema = new Schema(
  {
    event: { type: Schema.Types.ObjectId, ref: "Event", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Booking', bookingShema);