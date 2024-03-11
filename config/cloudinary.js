const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
  secure: true,
});
          
cloudinary.config({ 
  cloud_name: 'dgd3z5vbo', 
  api_key: '567818829335128', 
  api_secret: 'LpX1AjRZid6kMqjfqzMZcdxUdvw' 
});

const uploadImage = async (imagePath) => {
  // Use the uploaded file's name as the asset's public ID and
  // allow overwriting the asset with new versions
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    folder: "PORTFOLIO-PROJECT-IMAGES",
  };

  try {
    // Upload the image
    const result = await cloudinary.uploader.upload(imagePath, options);
    console.log(result);
    if (result) {
      fs.unlink(imagePath);
    }
    return result.public_id;
  } catch (error) {
    console.error(error);
  }
};

module.exports = uploadImage;
