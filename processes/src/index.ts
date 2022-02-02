import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import upload from './upload';

const app = express();
app.use(bodyParser.json());
app.use(cors({origin:true,credentials: true}));

app.post('/processes', (req, res) => {
  upload(req, res, function (error) {
    console.log('inside upload');
    if (error) {
      console.log(error);
      return res.status(200).send('Post Error!');
    }
    console.log('File uploaded successfully!');
    res.status(200).send('Success!');
  });
});

app.listen(4001, () => {
  console.log('Listening on 4001. Cool kittans.')
});