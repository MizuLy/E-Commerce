const cloudinary = require("../config/cloudinary");

const uploadImage = (buffer) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream((error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      })
      .end(buffer);
  });
};

module.exports = uploadImage;
