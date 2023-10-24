const express = require('express');
const populationRoutes = require('./routes/population/population-route');

const router = express.Router();

router.use('/population', populationRoutes);

module.exports = router;
