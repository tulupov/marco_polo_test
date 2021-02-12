const pgPromise = require('pg-promise');

module.exports.connection = pgPromise()(process.env.DATABASE_URL);
