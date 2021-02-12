const { connection } = require('./db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');

module.exports.JWT_ACCESS_TOKEN_EXPIRY_SECONDS = 1800;
module.exports.JWT_REFRESH_TOKEN_EXPIRY_SECONDS = 1209600;

module.exports.generateAccessToken = function (client, user) {
  const path = require('path');
  const filePath = path.join(__dirname, '../jwtRS256.key');
  const pKey = fs.readFileSync(filePath);
  const exp = new Date();
  const payload = {
    exp: exp.setSeconds(exp.getSeconds() + exports.JWT_ACCESS_TOKEN_EXPIRY_SECONDS),
    client_id: client.id,
    user_id: user.id,
    iss: "http://localhost:3000/oauth/login",
    sub: user.username
  };
  return jwt.sign(payload, pKey, { algorithm: 'RS256' });
};

module.exports.getAccessToken = function (bearerToken) {
  const path = require('path');
  const filePath = path.join(__dirname, '../jwtRS256.key.pub');
  const pubKey = fs.readFileSync(filePath);
  const decoded = jwt.verify(bearerToken, pubKey, { algorithms: ['RS256'] });
  const q = 'SELECT id FROM oauth_tokens WHERE access_token = $1 AND client_id = $2 AND user_id = $3';
  const params = [bearerToken, decoded.client_id, decoded.user_id];
  return connection.one(q, params).then(function () {
    return {
      accessToken: bearerToken,
      accessTokenExpiresAt: new Date(decoded.exp),
      client: { id: decoded.client_id },
      user: { id: decoded.user_id },
    };
  });
};

module.exports.getClient = function (clientId, clientSecret) {
  let q = 'SELECT * FROM oauth_clients WHERE client_id = $1';
  const params = [clientId];
  if (clientSecret) {
    q += ' AND client_secret = $2';
    params.push(clientSecret);
  }
  return connection.one(q, params).then(function (result) {
    return {
      id: result.client_id,
      clientSecret: result.client_secret,
      redirectUris: [result.redirect_uri],
      grants: ['authorization_code', 'refresh_token'],
    };
  });
};

module.exports.getRefreshToken = function (bearerToken) {
  return connection.one('SELECT * FROM oauth_tokens WHERE refresh_token = $1', [bearerToken])
    .then(function (result) {
      return {
        refreshToken: result.refresh_token,
        refreshTokenExpiresAt: result.refresh_token_expires_at,
        client: { id: result.client_id },
        user: { id: result.user_id },
      };
    });
};

module.exports.getUser = function (username, password) {
  return connection.one('SELECT * FROM users WHERE username = $1', [username])
    .then(function (result) {
      const compareRes = bcrypt.compareSync(password, result.password);
      return compareRes ? result : false;
    });
};

module.exports.saveToken = function (token, client, user) {
  const q = 'INSERT INTO oauth_tokens(access_token, access_token_expires_at, client_id, refresh_token, refresh_token_expires_at, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id';
  const params = [
    token.accessToken,
    token.accessTokenExpiresAt,
    client.id,
    token.refreshToken,
    token.refreshTokenExpiresAt,
    user.id,
  ];
  return connection.one(q, params).then(function (result) {
    return {
      ...result,
      ...token,
      client,
      user,
    };
  });
};

module.exports.revokeToken = function (token) {
  return connection.result('DELETE FROM oauth_tokens WHERE refresh_token = $1', [token.refreshToken], r => r.rowCount)
    .then(function (data) {
      return data > 0;
    });
};

module.exports.saveAuthorizationCode = function (code, client, user) {
  const q = 'INSERT INTO oauth_codes(authorization_code, expires_at, client_id, user_id) VALUES ($1,$2,$3,$4) RETURNING id';
  const params = [code.authorizationCode, code.expiresAt, client.id, user.id];
  return connection.one(q, params).then(result => {
    return {
      ...result,
      ...code,
      ...client,
      ...user,
    };
  });
};

module.exports.getAuthorizationCode = function (authorizationCode) {
  return connection.one('SELECT * FROM oauth_codes WHERE authorization_code = $1', [authorizationCode])
    .then(result => {
      return {
        code: result.authorization_code,
        expiresAt: result.expires_at,
        client: { id: result.client_id },
        user: { id: result.user_id },
      };
    });
};
module.exports.revokeAuthorizationCode = function (authorizationCode) {
  return connection.result('DELETE FROM oauth_codes WHERE authorization_code = $1', [authorizationCode.code], r => r.rowCount)
    .then(function (data) {
      return data > 0;
    });
};
