const Team = require("../models/Team");

const list_team = async (req, res) => {
  try {
    const teams = await Team.find({});
    res.json(teams);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const create_teams = async (req, res) => {
  const teams = req.body;

  try {
    const createdTeams = await Team.create(teams);
    res.json(createdTeams);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const add_teammate = async (req, res) => {
  const { teamId, teammateId } = req.body;
  try {
    const updatedTeam = await Team.findByIdAndUpdate(
      teamId,
      {
        $addToSet: { members: teammateId },
      },
      { new: true }
    );
    res.json(updatedTeam);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const find_team = async (req, res) => {
  const { name } = req.params;
  try {
    const team = await Team.findOne({ name }).populate("members");
    if (!team) return res.status(404).send("No team with such name");
    res.json(team);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  create_teams,
  add_teammate,
  list_team,
  find_team,
};
