const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");

const trainerSchema = new Schema(
  {
    first_name: { type: String, min: 2, max: 50, required: true },
    last_name: { type: String, min: 2, max: 50, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    active: { type: Boolean, default: true },
    class_type: {
      type: String,
      enum: ["Champion", "Rocket", "Psychic", "Rival"],
    },
  },
  { timestamps: true }
);

trainerSchema.methods.createToken = function () {
  const payload = { _id: this._id }; // do not pass anything that need to be secret in the payload
  const secretKey = process.env.JWT_SECRET;
  const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
  return token;
};

const Trainer = mongoose.model("Trainer", trainerSchema);

module.exports = Trainer;
