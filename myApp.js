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

// Definiere die Anzahl der Sekunden für 90 Tage
const timeInSeconds = 90 * 24 * 60 * 60;

// Verwende Helmet, um HSTS zu aktivieren
app.use(helmet.hsts({
  maxAge: timeInSeconds,  // Setze max-age auf 90 Tage
  force: true                   // Erzwinge die Verwendung von HTTPS
}));

// Verhindert DNS Prefetching, um die Privatsphäre zu schützen
app.use(helmet.dnsPrefetchControl({ allow: false }));

// Caching deaktivieren
app.use(helmet.noCache());

// Content Security Policy konfigurieren
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"], // Nur die eigene Domain wird standardmäßig erlaubt
      scriptSrc: ["'self'", "trusted-cdn.com"], // Skripte nur von der eigenen Domain und 'trusted-cdn.com'
    },
  })
);












































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
