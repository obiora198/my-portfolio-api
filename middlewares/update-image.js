const Project = require("../models/project");
const { uploadImages, deleteImages } = require("../config/cloudinary");

const updateImages = async (req, res, next) => {
  const { id: projectID } = req.params;
  let { imageId: imageIdToRemove } = req.query;
  imageIdToRemove = imageIdToRemove
  .split(",")
  .map((item) => ({ imageId: item }));
  const project = await Project.findOne({ _id: projectID });
  req.body.images = project.images;
  let newImages = req.files;
  console.log(newImages) 
  try {
    if (newImages) {
      newImages = await uploadImages(newImages);
      req.body.images = [...newImages];
    }
    if (imageIdToRemove) { 
      deleteImages(imageIdToRemove);
      imageIdToRemove = imageIdToRemove.map(id => id.imageId)
      req.body.images = req.body.images.map((item) => {
        if ( !imageIdToRemove.includes(item.imageId)) {
          return item;
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
  next();
};

module.exports = updateImages;
