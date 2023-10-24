const db = require('../../../data/dbConfig');

function populationRoutes(req, res, trimmedPath) {
  if (trimmedPath.match(/^api\/population\/state\/[^\/]+\/city\/[^\/]+$/)) {
    const segments = trimmedPath.split('/');
    const state = decodeURIComponent(segments[3]).toLowerCase();
    const city = decodeURIComponent(segments[5]).toLowerCase();

    if (req.method === 'GET') {
      (async () => {
        try {
          const result = await db.query(
            'SELECT population FROM city_populations WHERE state = $1 AND city = $2',
            [state, city],
          );

          if (result.rowCount === 0) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'City not found in the specified state' }));
          } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ population: result.rows[0].population }));
          }
        } catch (error) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Failed to retrieve data' }));
        }
      })();
    } else if (req.method === 'PUT') {
      let body = '';
      req.on('data', data => {
        body += data;
      });
      req.on('end', async () => {
        const population = parseInt(body, 10);

        if (isNaN(population)) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(
            JSON.stringify({
              error: 'Invalid population value. Just provide a number to update population.',
            }),
          );
          return;
        }

        try {
          await db.query('BEGIN');

          const updateResult = await db.query(
            'UPDATE city_populations SET population = $3 WHERE state = $1 AND city = $2',
            [state, city, population],
          );

          if (updateResult.rowCount > 0) {
            await db.query('COMMIT');
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Population updated successfully' }));
          } else {
            await db.query(
              'INSERT INTO city_populations (state, city, population) VALUES ($1, $2, $3)',
              [state, city, population],
            );
            await db.query('COMMIT');
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'City and population added successfully' }));
          }
        } catch (error) {
          await db.query('ROLLBACK');
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Failed to update or insert data' }));
        }
      });
    }
  } else {
    res.writeHead(405);
    res.end();
  }
}

module.exports = populationRoutes;
