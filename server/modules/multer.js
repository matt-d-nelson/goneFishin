const multer = require("multer");
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const config = require('../.env');

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/image");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: imageStorage });

module.exports = upload;
