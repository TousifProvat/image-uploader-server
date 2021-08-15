const mongoose = require('mongoose');

const uploadedImageSchema = new mongoose.Schema(
  {
    imageName: {
      type: String,
      required: true,
    },
    imageLink: {
      type: String,
      required: true,
      unique: true,
    },
    imageSize: {
      type: Number,
      required: true,
    },
    imageType: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('UploadedImage', uploadedImageSchema);
