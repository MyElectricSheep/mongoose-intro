const selfModificationOnly = (req, res, next) => {
  if (req.params.admin === req.trainer._id) {
    next();
  } else {
    return res.status(403).send("A trainer can only modify their own data");
  }
};

module.exports = selfModificationOnly;
