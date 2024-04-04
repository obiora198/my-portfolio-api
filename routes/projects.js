const express = require("express");
const router = express.Router();
const updateImages = require("../middlewares/update-image");

const {
  getAllProjects,
  getSingleproject,
  createNewproject,
  updateProject,
  deleteproject,
  createproject,
} = require("../controllers/projects");

router.route("/testing/").post(createproject);
router
  .route("/")
  .get(getAllProjects)
  .post(createNewproject);
router
  .route("/:id")
  .get(getSingleproject)
  .patch(updateImages, updateProject)
  .delete(deleteproject);

module.exports = router;
