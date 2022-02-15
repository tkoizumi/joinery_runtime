import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import upload from './upload';
import run from './runCode';
import schedule from 'node-schedule';
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
    console.log(output);
    res.status(200).send(output);
  });  
});

app.post('/processes/:fileName/schedule/:action', (req, res) => {
  const fileName = req.params.fileName;
  const action = req.params.action;
  const { code, frequency } = req.body;
  const msg = 'Request received.';
  console.log(msg, fileName, code, frequency);
  let resBody = {
    action: 'received'
  }
 
  if(action === 'stop') {
    console.log(schedule.scheduledJobs);
    let current_task = schedule.scheduledJobs[fileName];
    if(current_task){
      console.log(`Stopping ${fileName}`);
      current_task.cancel();
      resBody.action = 'stopped';
    }
    
  } else if(action ==='start') {
    console.log(`Starting ${fileName}`);
    schedule.scheduleJob(fileName, frequency, () => {
      run(code,(output: string) => {
        console.log(`${new Date()} \n ${output}`);
      });  
    });
    resBody.action = 'started';
  } else {
    console.log('This endpoint is not defined.');
  }
  res.status(200).send(resBody);
});

app.listen(4001, () => {
  console.log('Listening on 4001. Cool kittns.')
});