const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload-to-db");
const updateImages = require("../middlewares/update-image");

const {
  getAllProjects,
  getSingleproject,
  createNewproject,
  updateProject,
  deleteproject,
  createproject,
} = require("../controllers/projects");

router.route("/create").post(upload.single("image"), createproject);
router
  .route("/")
  .get(getAllProjects)
  .post(upload.array("images", 10), createNewproject);
router
  .route("/:id")
  .get(getSingleproject)
  .patch(upload.array("images", 10), updateImages, updateProject)
  .delete(deleteproject);

module.exports = router;
