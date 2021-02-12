const { connection } = require('./db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports.user = function (req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new Error('Username and password are required');
  }
  bcrypt.hash(password, saltRounds, async (err, hash) => {
    if (err) throw err;
    connection.one(
      'INSERT INTO users(username, password) VALUES ($1, $2) RETURNING id',
      [username, hash],
    )
      .then(() => res.sendStatus(200))
      .catch(err => res.status(500).send(err.message));
  });
};

module.exports.client = function (req, res) {
  const { client_id: clientId, client_secret: clientSecret, redirect_uri: redirectUri } = req.body;
  if (!clientId || !clientSecret || !redirectUri) {
    throw new Error('Missing required parameters: client_id, client_secret, redirect_uri');
  }
  connection.one(
    'INSERT INTO oauth_clients(client_id, client_secret, redirect_uri) VALUES ($1, $2, $3) RETURNING client_id',
    [clientId, clientSecret, redirectUri],
  )
    .then(() => res.sendStatus(200))
    .catch(err => res.status(500).send(err.message));
};
