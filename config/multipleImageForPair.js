var AWS = require('aws-sdk');
const dotenv = require('dotenv');
dotenv.config({ path: './config/.env' });
//upload multi image

const BUCKET_NAME = process.env.AWS_BUCKET_NAME;
const IAM_USER_KEY = process.env.AWS_ID;
const IAM_USER_SECRET = process.env.AWS_SECRET_KEY;

let s3bucket = new AWS.S3({
  accessKeyId: IAM_USER_KEY,
  secretAccessKey: IAM_USER_SECRET,
  Bucket: BUCKET_NAME,
});

module.exports = (req, res, next) => {
  var images = [];
  const file = Object.values(req.files).filter(Boolean).flat(Infinity);

  if (!file || file.length < 1) {
    req.images = images;
    return next();
  }
  file.map((item) => {
    var params = {
      Bucket: BUCKET_NAME,
      Key: item.originalname,
      Body: item.buffer,
    };

    s3bucket.upload(params, function (err, data) {
      if (err) {
        console.log('err', err);
        return res.json({ error: true, Message: err });
      } else {
        images.push({ name: item.fieldname, location: data.Location });
        if (images.length == file.length) {
          req.images = images;
          next();
        }
      }
    });
  });
};
