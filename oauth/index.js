const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const OAuthServer = require('express-oauth-server');
const model = require('./lib/model');
const signUp = require('./lib/sign-up');
const path = require('path');
const rsaPemToJwk = require('rsa-pem-to-jwk');
const fs = require('fs');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.oauth = new OAuthServer({
  model,
  accessTokenLifetime: model.JWT_ACCESS_TOKEN_EXPIRY_SECONDS,
  refreshTokenLifetime: model.JWT_REFRESH_TOKEN_EXPIRY_SECONDS,
});

// Post token.
app.post('/oauth/token', app.oauth.token());

// Post authorization.
app.post('/oauth/authorize',
  function (req, res, next) {
    const { username, password } = req.body;
    model.getUser(username, password)
      .then(result => {
        req.body.user = result;
        return next();
      })
      .catch(() => {
        const params = [
          'client_id',
          'redirect_uri',
          'response_type',
          'grant_type',
          'state',
        ]
          .map(a => `${a}=${req.body[a]}`)
          .join('&');
        return res.redirect(`/login?success=false&${params}`);
      });
  },
  app.oauth.authorize({
    authenticateHandler: {
      handle: req => req.body.user,
    },
  }));

// Get login.
app.get('/login', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/login.html'));
});

app.get('/jwkset', function (req, res) {
  const pem = fs.readFileSync(path.join(__dirname, 'jwtRS256.key'))
  const jwk = rsaPemToJwk(pem, {}, 'public');
  res.end(JSON.stringify({ keys: [jwk] }));
});

// Custom
app.post('/oauth/user', signUp.user);
app.post('/oauth/client', signUp.client);
app.get('/oauth/check', app.oauth.authenticate(), function (req, res) {
  res.send('Access Granted.');
});
app.listen(3000);
console.log('Server is running');
