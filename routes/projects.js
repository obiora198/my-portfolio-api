const express = require("express");
const router = express.Router();
const updateImages = require("../middlewares/update-image");
const authenticateUser = require("../middlewares/authentication");

const {
  getAllProjects,
  getSingleproject,
  createNewproject,
  updateProject,
  deleteproject,
  createproject,
} = require("../controllers/projects");

router.route("/testing/").post(createproject);
router.route("/").get(getAllProjects).post(authenticateUser,createNewproject);
router
  .route("/:id")
  .get(getSingleproject)
  .patch(authenticateUser,updateImages, updateProject)
  .delete(authenticateUser,deleteproject);

module.exports = router;
