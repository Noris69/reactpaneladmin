const router = require("express").Router();
const User = require("../models/User");
const Otp = require("../models/Otp");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const { Vonage } = require("@vonage/server-sdk");

const vonage = new Vonage({
  apiKey: "b502e5b7",
  apiSecret: "yr08BBT5obLE74bW",
});

async function sendSMS(to, from, text) {
  await vonage.sms
    .send({ to, from, text })
    .then((resp) => {
      console.log("Message sent successfully");
      // console.log(resp);
    })
    .catch((err) => {
      console.log("There was an error sending the messages.");
      // console.error(err);
    });
}

//REGISTER
router.post("/register", async (req, res) => {
  // FOR NUMBER
  if (req.body.number) {
    const user = await User.findOne({ number: req.body.number });
    if (user) return res.status(400).json("User already registered!");

    const OTP = otpGenerator.generate(4, {
      digits: true,
      alphabets: false,
      upperCase: false,
      specialChars: false,
    });

    const number = req.body.number;
    let otp = null;
    console.log(OTP);

    otp = new Otp({
      number: number,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email || "",
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_SEC
      ).toString(),
      otp: OTP,
    });
    const salt = await bcrypt.genSalt(10);
    otp.otp = await bcrypt.hash(otp.otp, salt);
    let message = `Votre code d'activation est: ${OTP}`;

    try {
      // FUNCTION SEND OTP
      sendSMS(number, process.env.TO, message);
      await otp.save();
      res.status(200).json("Otp send succesfully!");
    } catch (err) {
      res.status(500).json("Internal error!");
    }
  }
  // FOR EMAIL
  else if (req.body.email) {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (user) return res.status(400).json("User already registered!");

    const newUser = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_SEC
      ).toString(),
    });

    try {
      const savedUser = await newUser.save();

      const accessToken = jwt.sign(
        {
          id: newUser._id,
          role: newUser.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "2d" }
      );

      const { password, ...others } = user._doc;

      res
        .status(200)
        .json({ ...others, accessToken, message: "user verify with success" });
    } catch (err) {
      res.status(500).json(err);
    }
  } else return res.status(400).json("Wrong data");
});

//VERIFY REGISTRATION
router.post("/verify", async (req, res) => {
  if (!req.body.number && !req.body.otp)
    return res.status(501).json("Number and otp are not send");
  const userOtp = await Otp.findOne({
    number: req.body.number,
  });

  if (userOtp.length === 0) return res.status(400).json("OTP expired");

  const validUser = await bcrypt.compare(req.body.otp, userOtp.otp);

  if (validUser) {
    const user = new User({
      firstname: userOtp.firstname,
      lastname: userOtp.lastname,
      number: userOtp.number,
      email: userOtp?.email || "",
      password: userOtp.password,
    });
    try {
      const userSaved = await user.save();
      await Otp.findOneAndDelete({ _id: userOtp._id });

      const accessToken = jwt.sign(
        {
          id: user._id,
          role: user.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "30d" }
      );

      const { password, ...others } = user._doc;

      res
        .status(200)
        .json({ ...others, accessToken, message: "user verify with success" });
    } catch (error) {
      console.log(error);
    }
  } else {
    return res.status(500).json("Wrong otp!");
  }
});

//LOGIN

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(401).json("wrong credentials");

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const correctPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    if (correctPassword !== req.body.password)
      return res.status(401).json("wrong credentials");

    const accessToken = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    );

    const { password, ...others } = user._doc;

    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
