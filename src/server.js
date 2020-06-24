const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

const { logger } = require('./Logger');
const registerApiRoutes = require('./api');
const registerViewRoutes = require('./views');

const app = express();
const port = process.env.PORT || 8088;
const SESSION_SECRET_KEY = 'kjhdkd-sjkhsjsh-kjshshkdhsk-jsjhd';

const tarpitEnv = {
  sessionSecretKey: process.env.SESSION_SECRET_KEY || SESSION_SECRET_KEY,
  applicationPort: process.env.PORT || 8088
};

app.set('tarpitEnv', tarpitEnv);

// Insider attack
const insider = function(req, res, next) {
  /* Base64 Encoding of
   * console.log(req);
   * console.log(req.body);
   * console.log(req.query);
   */
  const encoded =
    'Y29uc29sZS5sb2cocmVxKTsgY29uc29sZS5sb2cocmVxLmJvZHkpOyBjb25zb2xlLmxvZyhyZXEucXVlcnkpOw==';
  const newBuf = Buffer.from(encoded, 'base64');
  eval(newBuf.toString('utf-8'));
  next();
};

app.use(insider);

app.use(function(err, req, res, next) {
  logger.error(err.stack);
  res.status(500).send('Something broke!');
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(cookieParser());

app.use(
  session({
    secret: SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false
  })
);

app.set('view engine', 'pug');
app.set('views', `./src/Views`);

registerApiRoutes(app);
registerViewRoutes(app);

app.listen(port, () =>
  logger.log(
    `Tarpit App listening on port ${port}!. Open url: http://localhost:${port}`
  )
);
