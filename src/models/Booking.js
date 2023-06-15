const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    packId: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    totalPrice: { type: String, required: true },
    paymentMethode: { type: String, required: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", BookingSchema);
