const populationRoutes = require('./routes/population/population-route');

function routes(req, res, trimmedPath) {
  if (trimmedPath.startsWith('api/population')) {
    populationRoutes(req, res, trimmedPath);
  } else {
    res.writeHead(404);
    res.end();
  }
}

module.exports = routes;
