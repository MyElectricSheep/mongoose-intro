const express = require("express");
const router = express.Router();

const {
  list_trainers,
  find_trainer,
  create_trainer,
  partially_update_trainer,
  fully_update_trainer,
  delete_trainer,
  delete_trainers,
} = require("../controllers/trainerController");

// router.post("/trainers", create_trainer);
// router.get("/trainers", list_trainers);
// router.get("/trainers/:id", find_trainer);
// router.patch("/trainers/:id", partially_update_trainer);
// router.put("/trainers/:id", fully_update_trainer);
// router.delete("/trainers/:id", delete_trainer);
// router.delete("/trainers", delete_trainers);

router
  .route("/")
  .get(list_trainers)
  .post(create_trainer)
  .delete(delete_trainers);

router
  .route("/:id")
  .get(find_trainer)
  .patch(partially_update_trainer)
  .put(fully_update_trainer)
  .delete(delete_trainer);

module.exports = router;
