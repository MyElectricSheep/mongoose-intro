const express = require("express");
const router = express.Router();
const Trainer = require("../models/Trainer");

router.post("/trainers", async (req, res) => {
  const { first_name, last_name, class_type } = req.body;
  // console.log({ first_name, last_name, class_type });

  // Trainer.create({ first_name, last_name, class_type })
  //   .then((data) => res.json(data))
  //   .catch((e) => console.log(e.message));

  try {
    const newTrainer = await Trainer.create({
      first_name,
      last_name,
      class_type,
    });
    res.json(newTrainer);
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/trainers", async (req, res) => {
  try {
    const trainers = await Trainer.find({});
    res.json(trainers);
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/trainers/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const trainer = await Trainer.findById(id);
    if (!trainer) return res.status(404).send("No such trainer");
    res.json(trainer);
  } catch (error) {
    console.log(error.message);
  }
});

router.patch("/trainers/:id", async (req, res) => {
  const { id } = req.params;
  const { key, value } = req.body;
  try {
    const { modifiedCount } = await Trainer.updateOne(
      { _id: id },
      { [key]: value }
    );
    if (!modifiedCount) return res.status(404).send("No such trainer");
    res.send("The trainer was patched successfully");
    // console.log(response);
  } catch (error) {
    console.log(error.message);
  }
});

router.put("/trainers/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedTrainer = await Trainer.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedTrainer) return res.status(404).send("No such trainer");
    res.json(updatedTrainer);
  } catch (error) {
    console.log(error.message);
  }
});

router.delete("/trainers/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTrainer = await Trainer.findOneAndDelete({ _id: id });
    if (!deletedTrainer) return res.status(404).send("No such trainer");
    res.json(deletedTrainer);
  } catch (error) {
    console.log(error.message);
  }
});

router.delete("/trainers", async (req, res) => {
  const { key, value } = req.body;
  try {
    if (!key || !value) {
      return res.status(400).send("Please provide a valid key/value pair");
    }

    const response = await Trainer.deleteMany({ [key]: value });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
