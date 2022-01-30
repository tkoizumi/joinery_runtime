import aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';

aws.config.update({
  accessKeyId: 'QCK265TL5N7S2NE5R5SL',
  secretAccessKey: 'qkzUJ8/AwST1npBhwSzUqOtqgJXhbrb/OlW8nE+81po'
});

const spacesEndpoint = new aws.Endpoint('nyc3.digitaloceanspaces.com');
const s3 = new aws.S3({
  endpoint: spacesEndpoint
});

const upload = () => {
  multer({
    storage: multerS3({
      s3: s3,
      bucket: 'joinery',
      acl: 'public-read',
      key: function (request, file, cb) {
        console.log(file);
        cb(null, file.originalname);
      }
    })
  }).array('upload', 1);
}