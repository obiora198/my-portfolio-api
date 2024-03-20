// const Grid = require("gridfs-stream");
const {GridFsStorage} = require('multer-gridfs-storage')
const multer = require("multer");
const BadRequestError = require('../errors/bad-request')
// const fs = require('fs')
// const mongoose = require("mongoose");



const url = process.env.MONGO_URI

// Create a storage object with a given configuration
const storage = new GridFsStorage({
  url,
  file: (req, file) => {
    //If it is an image, save to photos bucket
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" || file.mimetype === "image/png") {
      return {
        bucketName: "portfolio-api-photos",
        filename: `${Date.now()}_${file.originalname}`,
      }
    } else {
      //Otherwise save to default bucket
      throw new BadRequestError('only jpg, jpeg and png files supported')
    }
  },
})

// Set multer storage engine to the newly created object
const upload = multer({ storage })

module.exports = upload























// const upload = (req, res, next) => {
//   try {
//     const gfs = new Grid(mongoose.connection.db, mongoose.mongo);
//     const writeStream = gfs.createWriteStream({
//       filename: req.file.originalname,
//       mode: "w",
//       content_type: req.file.mimetype,
//     });
//     fs.createReadStream(req.file.path).pipe(writeStream);
//     writeStream.on("close", (file) => {
//       fs.unlink(req.file.path, (err) => {
//         if (err) throw err;
//         return res.json({ file });
//       });
//     });
//   } catch (err) {
//     return res
//       .status(400)
//       .json({ message: "Error uploading file", error: err });
//   }
// };
