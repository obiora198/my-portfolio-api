const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
  secure: true,
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const uploadImages = async (images) => {
  // Use the uploaded file's name as the asset's public ID and
  // allow overwriting the asset with new versions
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    folder: "PORTFOLIO-PROJECT-IMAGES",
  };

  // Upload the image
  let count = 1;
  let uploadPromises = images.map(async (image) => {
    try {
      const response = await cloudinary.uploader.upload(image.path, options);
      console.log(`>>> uploading ${(count++ / images.length) * 100}%`);
      fs.unlink(image.path, (err) => {
        if (err) {
          console.error(err);
        }
      });
      return { imageUrl: response.url, imageId: response.public_id };
    } catch (err) {
      console.error(err);
      return null; // or handle the error as needed
    }
  });

  let result = await Promise.all(uploadPromises);
  return result;
};

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

module.exports = { uploadImages, deleteImages };
