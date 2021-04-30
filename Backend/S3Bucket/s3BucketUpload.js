const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const { BUCKET_NAME } = process.env;
const s3Storage = new AWS.S3({
  accessKeyId: process.env.ACCESSKEYID,
  secretAccessKey: process.env.SECRETACCESSKEY,
});

const mult = multer({
  storage: multerS3({
    s3: s3Storage,
    bucket: BUCKET_NAME,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    // eslint-disable-next-line func-names
    // eslint-disable-next-line object-shorthand
    key: function (req, file, cb) {
      const folderName = 'glassdoor-proj';
      cb(null, `${folderName}/${Date.now().toString()}/${file.originalname}`);
    },
  }),
});

const imageUpload = mult.single('file');
const multiupload = mult.array('multfiles');

// single file upload
const uploadFile = async (req, res) => {
  try {
    imageUpload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        res.json({ status: 400, error: err.message });
      } else if (err) {
        res.json({ status: 400, error: err.message });
      } else {
        res.writeHead(200, {
          'Content-Type': 'text/plain',
        });
        res.end(req.file.location);
      }
    });
  } catch (error) {
    res.writeHead(401, {
      'Content-Type': 'text/plain',
    });
    res.end('Network Error');
  }
  return res;
};

// multiple file upload
const uploadmultiFile = async (req, res) => {
  try {
    multiupload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        res.json({ status: 400, error: err.message });
      } else if (err) {
        res.json({ status: 400, error: err.message });
      } else {
        // console.log(req.file.location);
        const result = req.files.map((a) => a.location);
        res.writeHead(200, {
          'Content-Type': 'text/plain',
        });
        res.end(JSON.stringify(result));
      }
    });
  } catch (error) {
    res.writeHead(401, {
      'Content-Type': 'text/plain',
    });
    res.end('Network Error');
  }
  return res;
};

module.exports = {
  uploadFile,
  uploadmultiFile,
  imageUpload,
};
