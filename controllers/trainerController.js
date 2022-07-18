const Trainer = require("../models/Trainer");
const Team = require("../models/Team");
const bcrypt = require("bcrypt");

const list_trainers = async (req, res) => {
  // console.log(req.headers);
  // console.log(req.trainer);
  try {
    const trainers = await Trainer.find({}, { password: 0 });
    res.json(trainers);
  } catch (error) {
    console.log(error.message);
  }
};

const find_trainer = async (req, res) => {
  const { id } = req.params;

  try {
    const trainer = await Trainer.findById(id);
    if (!trainer) return res.status(404).send("No such trainer");

    const team = await Team.findOne({ members: trainer._id });

    res.json({ trainer, team });
  } catch (error) {
    console.log(error.message);
  }
};

const create_trainer = async (req, res) => {
  const { first_name, last_name, class_type, email, password } = req.body;

  console.time("password hashing with salt");
  const hashedPassword = await bcrypt.hash(password, 10);
  console.timeEnd("password hashing with salt");

  try {
    const newTrainer = await Trainer.create({
      first_name,
      last_name,
      class_type,
      email,
      password: hashedPassword,
    });

    const token = newTrainer.createToken();

    res
      .set("x-authorization-token", token)
      .json({ _id: newTrainer._id, email: newTrainer.email });
  } catch (error) {
    console.log(error.message);
  }
};

const partially_update_trainer = async (req, res) => {
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
};

const fully_update_trainer = async (req, res) => {
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
};

const delete_trainer = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTrainer = await Trainer.findOneAndDelete({ _id: id });
    if (!deletedTrainer) return res.status(404).send("No such trainer");
    res.json(deletedTrainer);
  } catch (error) {
    console.log(error.message);
  }
};

const delete_trainers = async (req, res) => {
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
};

module.exports = {
  list_trainers,
  find_trainer,
  create_trainer,
  partially_update_trainer,
  fully_update_trainer,
  delete_trainer,
  delete_trainers,
};
