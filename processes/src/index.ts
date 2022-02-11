import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import upload from './upload';
import run from './runCode';
import s3 from './s3client';

const app = express();

app.use(bodyParser.json());
app.use(cors({origin:true,credentials: true}));

app.post('/processes', (req, res) => {
  upload(req, res, function (error) {
    if (error) {
      console.log(error);
      res.status(400).send('Post Error!');
    }
    res.status(200).send('Upload Success!');
  });
});

app.get('/processes/all', (req, res) => {
  console.log(req);
  const params = {Bucket: 'joinery'};
  s3.listObjectsV2(params, (err,data) => {
    if(err){
      res.status(400).send(err.message);
    } else {
      res.status(200).send(data);
    }
  });
});

app.get('/processes/:fileName', (req, res) => {
  const params = {Bucket: 'joinery', Key: req.params.fileName};
  s3.getObject(params, (err,data) => {
    if(err){
      res.status(400).send(err.message);
    } else {
      res.status(200).send(data.Body?.toString());
    }
  });
});

app.post('/processes/:fileName/run', (req, res) => {
  const { code } = req.body;
  run(code,(output: string) => {
    console.log(`${output}`);
    res.status(200).send(output);
  });  
});

app.listen(4001, () => {
  console.log('Listening on 4001. Cool kittans.')
});