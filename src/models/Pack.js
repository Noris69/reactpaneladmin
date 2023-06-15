const mongoose = require("mongoose");

const PackSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true},
    title: { type: String, required: true, unique: true },
    body: { type: String, required: true },
    img: { type: String, required: true },
    status: { type: String },
    price_1_week: { type: String, require: true },
    price_2_week: { type: String, require: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pack", PackSchema);
