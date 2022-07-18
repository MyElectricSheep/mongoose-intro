const Trainer = require("../models/Trainer");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  // res.send("Logging in");
  const { email, password } = req.body;

  // 1) Check if the trainer exists in the DB and exit if it does not exist
  const trainer = await Trainer.findOne({ email });
  if (!trainer) return res.status(400).send("Invalid request");

  // 2) Check if the hashes match (with Bcrypt) stored password hash in the DB === sent password hashed
  const match = await bcrypt.compare(password, trainer.password);

  // 3) Send an answer: hey you're logged in / you are not logged in
  if (!match) return res.status(400).send("Invalid request");

  const token = trainer.createToken();

  res.set("x-authorization-token", token).send("Login successful"); // user is authenticated and we send a JWT with information about that specific user
};

module.exports = {
  login,
};
