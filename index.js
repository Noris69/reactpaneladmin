const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const packRoute = require("./routes/pack");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("db connection success");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/packs", packRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is run on port ${process.env.PORT}`);
});
