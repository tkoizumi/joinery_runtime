import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import axios from 'axios';
import upload from './upload';

const app = express();
app.use(bodyParser.json());
app.use(cors({origin:true,credentials: true}));

const spacesEndpoint = 'https://joinery.nyc3.digitaloceanspaces.com';

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

app.get('/processes/hello-sir', async (req, res) => {
  const resp = await axios.get(`${spacesEndpoint}/hello-sir`);
  console.log(resp);
  res.status(200).send('you got me!');
});

app.listen(4001, () => {
  console.log('Listening on 4001. Cool kittans.')
});