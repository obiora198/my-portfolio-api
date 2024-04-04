const Project = require("../models/project");
const {
  deleteImages,
} = require("../config/cloudinary-delete-image");

const updateImages = async (req, res, next) => {
  const { id: projectID } = req.params;
  let { imageId: imageIdToRemove } = req.query;

  let newImages = req.body.images;
  try {
    if (newImages) {
      const project = await Project.findOne({ _id: projectID });
      project.images.map(image => {
        req.body.images.push(image)
      })

    }
    if (imageIdToRemove) {
      imageIdToRemove = imageIdToRemove
        .split(",")
        .map((item) => ({ imageId: item }));
      deleteImages(imageIdToRemove);
      imageIdToRemove = imageIdToRemove.map((id) => id.imageId);
      req.body.images = req.body.images.filter(
        (item) => !imageIdToRemove.includes(item.imageId)
      );
    }
  } catch (error) {
    console.log(error);
  }
  next();
};

module.exports = updateImages;
