import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import axios from 'axios';
import upload from './upload';
import s3 from './s3client';

const app = express();
app.use(bodyParser.json());
app.use(cors({origin:true,credentials: true}));

app.post('/processes', (req, res) => {
  upload(req, res, function (error) {
    console.log('inside upload');
    if (error) {
      console.log(error);
      res.status(400).send('Post Error!');
    }
    console.log('File uploaded successfully!');
    res.status(200).send('Success!');
  });
});

app.get('/processes/:fileName', (req, res) => {
  const params = {Bucket: 'joinery', Key: req.params.fileName};
  console.log(params);
  s3.getObject(params, (err,data) => {
    if(err){
      res.status(400).send(err.message);
    } else {
      res.status(200).send(data.Body?.toString());
    }
  });
});

app.listen(4001, () => {
  console.log('Listening on 4001. Cool kittans.')
});