const jwt = require("jsonwebtoken");
// const Trainer = require("../models/Trainer");

const authorizeTrainer = async (req, res, next) => {
  const authHeaders = req.headers.authorization;
  if (!authHeaders) return res.status(401).send("Access denied");

  // 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmQ1YTY3NzNjNWViZTY3ZTYyMTljY2EiLCJpYXQiOjE2NTgxNjk1NTMsImV4cCI6MTY1ODE3MzE1M30.-9KtZIB47MFHXli0GgjvAnECnSYN3V03x0sXo0iKQys'
  const [_, token] = authHeaders.split(" ");
  if (!token) return res.status(401).send("Access denied");

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // payload contains something like:
    // { _id: '62d5a6773c5ebe67e6219cca', iat: 1658169553, exp: 1658173153 }

    // const trainer = await Trainer.findById(payload._id);

    req.trainer = payload; // context about WHO is making the request (and if that person is authorized to do so)
    next();
  } catch (error) {
    return res.status(403).send("Invalid credentials");
  }
};

module.exports = authorizeTrainer;
