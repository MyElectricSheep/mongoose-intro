const mongoose = require("mongoose");
const { mapReduce } = require("./Trainer");
const Schema = mongoose.Schema;

const teamSchema = new Schema(
  {
    name: { type: String, required: true },
    mascot: { type: String },
    color: { type: String },
    members: [{ type: Schema.Types.ObjectId, ref: "Trainer" }],
  },
  { timestamps: true }
);

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;
