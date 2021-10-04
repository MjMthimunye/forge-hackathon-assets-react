const path = require('path');
const express = require('express');
const app = express();
const request = require('request');
const buildDirectory = path.join(__dirname, '../build')
const credentials = (
  require ('fs').existsSync(path.join(__dirname, 'credentials.js'))
    ? require ('./credentials')
    : (
        console.log('No credentials.js file present, assuming using FORGE_CLIENT_ID & FORGE_CLIENT_SECRET system variables.'),
        require ('./credentials_')
      )
);

app.set('port', (process.env.PORT || 3001));
app.use(express.static(buildDirectory))

app.get('/', function (req, res) {
  res.sendFile(`${buildDirectory}/index.html`)
})
app.get ('/token', function (req, res) {
  request.post(
    credentials.Authentication,
    { form: credentials.credentials },
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.json(JSON.parse(body)) ;
      }
    });
});

app.listen(app.get('port'), () => {
  // eslint-disable-line no-console
  console.log(`Find the server at: http://localhost:${app.get('port')}/`);
});