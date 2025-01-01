const express = require('express');
const app = express();
const helmet = require('helmet');


// Entferne den "X-Powered-By"-Header
app.use(helmet.hidePoweredBy());

// Setze helmet.frameguard(), um Clickjacking zu verhindern
app.use(helmet.frameguard({ action: 'deny' }));

// Helmet xssFilter Middleware aktivieren
app.use(helmet.xssFilter());

// Aktiviert den X-Content-Type-Options-Header mit dem Wert "nosniff"
app.use(helmet.noSniff());

// Aktiviert den X-Download-Options-Header mit dem Wert "noopen"
app.use(helmet.ieNoOpen());
















































module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🥦Useful Programmer Info Secrurty App Started on Port ${port}`)
});
