import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).send('success');
});

app.listen(4000, () => {
  console.log('Listening on 4000')
});