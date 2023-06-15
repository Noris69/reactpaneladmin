const Pack = require("../models/Pack");
const {
  verifyTokenAndAdmin,
} = require("./verifyToken");
const router = require("express").Router();

//CREATE

router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newPack = new Pack(req.body);

  try {
    const savedPack = await newPack.save();
    res.status(200).json(savedPack);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE

router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedPack = await Pack.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedPack);
  } catch (error) {
    res.status(500).json(err);
  }
});

//DELETE

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Pack.findByIdAndDelete(req.params.id);
    res.status(200).json("Pack has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET PACK

router.get("/find/:id", async (req, res) => {
  try {
    const pack = await Pack.findById(req.params.id);
    
    res.status(200).json(pack);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL PACKS

router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let packs;
    if (qNew) {
      packs = await Pack.find().sort({ createdAt: -1 }).limit(qNew);
    } else if (qCategory) {
      packs = await Pack.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else{
        packs = await Pack.find()
    }

    res.status(200).json(packs);
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;
