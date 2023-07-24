import express from 'express';
import * as path from 'node:path';
import * as url from 'node:url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => {
  const tmplFile = './static/index.html';
  const tmplPath = path.join(__dirname, tmplFile);

  res.sendFile(tmplPath);
})

app.get('/getdata', (req, res) => {
  let result = { data: [
    ['x1', 'x2', 'x3'],
    ['x1', 'x2', 'x3'],
    ['x1', 'x2', 'x3'],
  ]};
  res.send(result);
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

