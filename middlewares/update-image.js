const Project = require("../models/project");
const { uploadImages, deleteImages } = require("../config/cloudinary");

const updateImages = async (req, res, next) => {
  const { id: projectID } = req.params;
  let { imageId: imageIdToRemove } = req.query;

  const project = await Project.findOne({ _id: projectID });
  req.body.images = project.images;
  let newImages = req.files;
  try {
    if (newImages) {
      newImages = await uploadImages(newImages);
      newImages.forEach(image => {
        req.body.images.push(image);
      });
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
