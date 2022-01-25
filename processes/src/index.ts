import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/processes', (req, res) => {
  const { code } = req.body;
  console.log(`running code like this =>`);
  eval(code);
  res.status(200).send('Post success!');
});

app.listen(4001, () => {
  console.log('Listening on 4001. Nihao!')
});