const Booking = require("../models/Booking");
const {
  verifyTokenAndAdmin, verifyTokenAndAuthorization,
} = require("./verifyToken");
const router = require("express").Router();

//CREATE

router.post("/", verifyTokenAndAuthorization, async (req, res) => {
  const newBooking = new Booking(req.body);

  try {
    const savedBooking = await newBooking.save();
    res.status(200).json(savedBooking);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE

router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedBooking);
  } catch (error) {
    res.status(500).json(err);
  }
});

//DELETE

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.status(200).json("Booking has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET BOOKING

router.get("/find/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    res.status(200).json(booking);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL BOOKINGS

router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let bookings;
    if (qNew) {
      bookings = await Booking.find().sort({ createdAt: -1 }).limit(qNew);
    } else if (qCategory) {
      bookings = await Booking.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else{
        bookings = await Booking.find()
    }

    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;
