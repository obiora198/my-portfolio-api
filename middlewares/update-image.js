const Project = require("../models/project");
const deleteImages = require("../config/cloudinary-delete-image");

const updateImages = async (req, res, next) => {
  const { id: projectID } = req.params;
  const project = await Project.findOne({ _id: projectID });
  let { imageId: imagesToRemove } = req.query;
  let imagesArray = []
  if(imagesToRemove) {
    imagesArray = imagesToRemove.split(",");
  }

  let newImages = req.body.images;
  req.body.images = project.images
  try {
    if (newImages && newImages.length > 0) {
      newImages.map((image) => {
        req.body.images.push(image);
      });
    }
    if (imagesToRemove) {
      deleteImages(imagesArray);
      req.body.images = req.body.images.filter(image => !imagesArray.includes(image));
    }
  } catch (error) {
    console.log(error);
  }
  next();
};

module.exports = updateImages;
