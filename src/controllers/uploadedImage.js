const UploadedImage = require('../models/UploadedImage');
const { cloudinary } = require('../utils/cloudinary');

const imageTypeValidator = (imgType) => {
  const accepetedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  return accepetedTypes.includes(imgType);
};

const imageSize = (size) => {
  return size / 1000000;
};

exports.uploadImage = async (req, res) => {
  const { originalname, mimetype, path } = req.file;

  try {
    if (!imageTypeValidator(mimetype)) {
      return res.status(404).json({ message: 'Wrong file type' });
    }

    const sharedImg = await UploadedImage.findOne({ imageName: originalname });

    if (sharedImg) {
      return res.status(200).json(sharedImg);
    }

    const uploadedResponse = await cloudinary.uploader.upload(path);

    if (Object.keys(uploadedResponse).length < 1) {
      return res
        .status(500)
        .json({ message: 'Something went wrong! Please try again later' });
    }

    const uploadedImage = new UploadedImage({
      imageName: originalname,
      imageLink: uploadedResponse.secure_url,
      imageType: uploadedResponse.format,
      imageSize: imageSize(uploadedResponse.bytes),
    });

    const image = await uploadedImage.save();

    return res.status(201).json(image);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
