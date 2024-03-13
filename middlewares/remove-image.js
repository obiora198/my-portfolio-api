const Project = require("../models/project");
const { uploadImages, deleteImages } = require("../config/cloudinary");

const removeImages = async (req, res, next) => {
  const { id: projectID } = req.params;
  let { imageId: imageIdToRemove } = req.query;
  let imagesToRemove = imageIdToRemove
    .split(",")
    .map((item) => ({ imageId: item }));
  const project = await Project.findOne({ _id: projectID });
  req.body.images = project.images;
  console.log(req.body.images);
  let newImages = req.files;
  try {
    if (newImages) {
      newImages = await uploadImages(newImages);
      req.body.images = [...newImages];
      console.log(req.body.images);
    }
    if (imagesToRemove) {
      deleteImages(imagesToRemove);
      req.body.images = req.body.images.map((item) => {
        if (item.imageId != imageIdToRemove) {
          return item;
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
  next();
};

module.exports = removeImages;
