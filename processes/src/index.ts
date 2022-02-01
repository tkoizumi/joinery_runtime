import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';

const app = express();
app.use(bodyParser.json());
app.use(cors({origin:true,credentials: true}));

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

app.post('/processes', (req, res) => {
  upload(req, res, function (error) {
    console.log('inside upload');
    if (error) {
      console.log(error);
      return res.status(200).send('Post Error!');
    }
    console.log('File uploaded successfully.');
    res.status(200).send('Post success!');
  });

  
});

app.listen(4001, () => {
  console.log('Listening on 4001. Cool kittans.')
});