const express = require('express');
const router = express.Router();
const db = require('../../../data/dbConfig');

// GET
router.get('/state/:state/city/:city', async (req, res) => {
  const state = req.params.state.toLowerCase();
  const city = req.params.city.toLowerCase();
  try {
    const result = await db.query(
      'SELECT population FROM city_populations WHERE state = $1 AND city = $2',
      [state, city],
    );

    if (result.rowCount === 0) {
      return res.status(404).send({ error: 'City not found in the specified state' });
    }

    return res.send({ population: result.rows[0].population });
  } catch (error) {
    return res.status(500).send({ error: 'Failed to retrieve data' });
  }
});

// PUT
router.put('/state/:state/city/:city', async (req, res) => {
  const state = req.params.state.toLowerCase();
  const city = req.params.city.toLowerCase();
  const population = parseInt(req.body, 10);
  console.log(req.body);

  if (isNaN(population) || typeof population !== 'number') {
    return res
      .status(400)
      .send({ error: 'Invalid population value just provide a number to update population' });
  }

  try {
    // Begin the transaction
    await db.query('BEGIN');

    // First, attempt to update the city
    const updateResult = await db.query(
      'UPDATE city_populations SET population = $3 WHERE state = $1 AND city = $2',
      [state, city, population],
    );

    if (updateResult.rowCount > 0) {
      // Commit the transaction
      await db.query('COMMIT');
      return res.status(200).send({ message: 'Population updated successfully' });
    }

    // If no rows were updated, then insert a new city
    await db.query('INSERT INTO city_populations (state, city, population) VALUES ($1, $2, $3)', [
      state,
      city,
      population,
    ]);

    // Commit the transaction
    await db.query('COMMIT');
    return res.status(201).send({ message: 'City and population added successfully' });
  } catch (error) {
    // If there's an error, roll back the transaction
    await db.query('ROLLBACK');
    return res.status(500).send({ error: 'Failed to update or insert data' });
  }
});

module.exports = router;
