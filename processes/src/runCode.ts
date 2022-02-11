import { spawn } from 'child_process';

const runCode = (code: string, callback: (value: string) => void) => {
  console.log(`starting to run code => ${code}`);
  const node = spawn('node',['-i'], {stdio: ['pipe', 'pipe', 'ignore']});
  let blob: string = '';
  node.stdout.on('data', data => {
    const strData = String(data);
    blob += strData;
  });
  node.stdout.on('end', () => {
    callback(blob);
  })
  node.stdout.on('error',err => {
      console.log(err);
  });  

  const buf = Buffer.from(code, 'utf8');
  node.stdin.write(buf);
  node.stdin.end();
}

const run = (code: string, callback: (value: string) => void) => {
  runCode(code, (data: string) => {
    callback(data);
  });
};

export default run;