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
  var productImage = [];
  const images = {};
  const file = req.files;

  if (!file || file.length < 1) {
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
        productImage.push(data.Location);
        images[item.fieldname] = data.Location;
        if (productImage.length == file.length) {
          req.imageArr = productImage;
          req.images = images;
          next();
        }
      }
    });
  });
};
