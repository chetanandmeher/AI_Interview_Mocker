const express = require('express');
const dbClient = require('./config/database');

const app = express();

// ...existing code...

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
