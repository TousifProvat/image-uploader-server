const UploadedImage = require('../models/UploadedImage');

const generatePublicUrl = (filename) => {
  return `https://image-uploader-tap.herokuapp.com/${filename}`;
};

const imageTypeValidator = (imgType) => {
  const accepetedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  return accepetedTypes.includes(imgType);
};

const imageSize = (size) => {
  return size / 1000000;
};

exports.uploadImage = async (req, res) => {
  const { originalname, filename, mimetype, size } = req.file;
  try {
    if (!imageTypeValidator(mimetype)) {
      return res.status(404).json({ message: 'Wrong file type' });
    }

    const sharedImg = await UploadedImage.findOne({ imageName: originalname });

    if (sharedImg) {
      return res.status(200).json(sharedImg);
    }

    const imgType = mimetype.split('/')[1];

    const uploadedImage = new UploadedImage({
      imageName: originalname,
      imageLink: generatePublicUrl(filename),
      imageType: imgType,
      imageSize: imageSize(size),
    });

    const image = await uploadedImage.save();

    return res.status(201).json(image);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
