import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';

if(!process.env.AWS_KEY || !process.env.AWS_SECRET) {
  throw new Error('AWS Key or Secret not defined')
}

aws.config.update({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET
});

const spacesEndpoint = new aws.Endpoint('nyc3.digitaloceanspaces.com');
const s3 = new aws.S3({
  endpoint: spacesEndpoint
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'joinery',
    acl: 'public-read',
    key: function (request, file, cb) {
      console.log(file);
      cb(null, file.originalname);
    }
  })
}).array('file', 1);

export default upload;
