const cloudinary = require("cloudinary").v2;

cloudinary.config({
  secure: true,
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});


const deleteImages = (images) => {
  try {
    images.forEach(async (image) => {
      if (image != null) {
        cloudinary.uploader.destroy(image.imageId);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = deleteImages;
