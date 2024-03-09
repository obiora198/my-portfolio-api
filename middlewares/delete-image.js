const fs = require("fs");

const deleteImage = (oldImagePath) => {
    fs.unlink(oldImagePath, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    //   console.log("old image removed successfully");
      return;
    });
}

module.exports = deleteImage