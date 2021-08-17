const express = require('express');
const router = express.Router();
const multer = require('multer');
// const path = require('path');
const { uploadImage } = require('../controllers/uploadedImage');

const storage = multer.diskStorage({});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1 * 10000 * 10000 },
});

router.post('/images/upload', upload.single('sharedImage'), uploadImage);

module.exports = router;
