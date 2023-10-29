require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express();
const checkUrl = require('is-url')
// Basic Configuration
const port = process.env.PORT || 3000;
let uniqueId = 1;
const shortUrl = {}


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/public', express.static(`${process.cwd()}/public`));


app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


// Your first API endpoint
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl', (req, res) => {

  if (!checkUrl(req.body.url)) {
    res.send({ error: 'invalid url' })
    return;
  }

  let originalUrl = req.body.url;

  shortUrl[uniqueId] = req.body.url
  console.log(shortUrl)
  res.send({
    original_url: originalUrl, short_url: uniqueId
  })
  uniqueId++;
})

app.get('/api/shorturl/:id', (req, res) => {
  const id = req.params.id
  const url = shortUrl[id]
  res.redirect(url)
}

)

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
