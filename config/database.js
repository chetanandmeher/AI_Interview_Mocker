const { Client } = require('pg');

const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false,
  },
  connectionTimeoutMillis: 30000, // Increase connection timeout to 30 seconds
});

require('dotenv').config();
var Client = require('pg').Client;
var retry = require('retry');

// Connection string from .env file
var connectionString = process.env.DATABASE_URL;

function connectWithRetry() {
  var operation = retry.operation({
    retries: 5, // number of retries before giving up
    minTimeout: 4000, // minimum time between retries in milliseconds
    randomize: true, // adds randomness to timeouts to prevent retries from overwhelming the server
  });

  operation.attempt(function (currentAttempt) {
    var client = new Client({ connectionString });

    client
      .connect()
      .then(function () {
        console.log('Connected to the database');

        // Perform your operations with the client
        // For example, let's run a simple SELECT query
        return client.query('SELECT NOW()');
      })
      .then(function (res) {
        console.log(res.rows[0]);

        return client.end();
      })
      .catch(function (err) {
        if (operation.retry(err)) {
          console.warn(`Failed to connect on attempt ${currentAttempt}, retrying...`);
        } else {
          console.error('Failed to connect to the database after multiple attempts:', err);
        }
      });
  });
}

// Usage
connectWithRetry();

module.exports = client;
