const mongoose = require("mongoose");
const BookingSchema = new mongoose.Schema(
  {
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    host: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    listing: { type: mongoose.Schema.Types.ObjectId, ref: "Listing" },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    totalPrice: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", BookingSchema);
