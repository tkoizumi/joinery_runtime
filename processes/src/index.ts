import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import multer from 'multer';

const upload = multer();

const app = express();
app.use(bodyParser.json());
app.use(cors({origin:true,credentials: true}));

app.post('/processes', (req, res) => {
  const { code, selectedFile } = req.body;
  console.log(`request: ${req}`);
  console.log(`running code like this ==>`);
  console.log(`req body => ${req.body}`);
  console.log(`req file => ${req.file}`);
  eval(code);
  res.status(200).send('Post success!');
});

app.listen(4001, () => {
  console.log('Listening on 4001. Cool kittans.')
});