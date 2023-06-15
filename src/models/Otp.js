const mongoose = require("mongoose");

const OtpSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, unique: true },
  number: { type: String, unique: true },
  password: { type: String, required: true, minlength: 6 },
  role: {
    type: String,
    default: "user",
  },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, index: { expires: 300 } },
  //Automatically delete after 5 minutes from database
});

module.exports = mongoose.model("Otp", OtpSchema);
