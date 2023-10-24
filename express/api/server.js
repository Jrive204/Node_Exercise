const express = require('express');
const cors = require('cors');
const apiRoutes = require('./api-routes');
const bodyParser = require('body-parser');

// Near the top of your main server file

const app = express();

app.use(cors());
app.use(bodyParser.text());

// Use the routes
app.use('/api', apiRoutes);

// Root Route
app.get('/api', (req, res) => {
  return res.json({ welcome: 'API router' });
});

module.exports = app;
