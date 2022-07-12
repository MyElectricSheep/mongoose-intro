const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const trainerSchema = new Schema(
  {
    first_name: { type: String, min: 2, max: 50, required: true },
    last_name: { type: String, min: 2, max: 50, required: true },
    active: { type: Boolean, default: true },
    class_type: {
      type: String,
      enum: ["Champion", "Rocket", "Psychic", "Rival"],
    },
  },
  { timestamps: true }
);

const Trainer = mongoose.model("Trainer", trainerSchema);

module.exports = Trainer;
