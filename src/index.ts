import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).send('Post success/Get');
});

app.post('/', (req, res) => {
  const { code } = req.body;
  console.log(`running code...`);
  eval(code);
  res.status(200).send('Post success!');
});

app.listen(4000, () => {
  console.log('Listening on 4000')
});