const express = require("express");
const router = express.Router();

const {
  create_teams,
  add_teammate,
  find_team,
  list_team,
} = require("../controllers/teamController");

router.get("/:name", find_team);
router.get("/", list_team);
router.post("/", create_teams);
router.patch("/members/add", add_teammate);

module.exports = router;
