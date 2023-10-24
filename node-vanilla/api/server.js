const url = require('url');
const routes = require('./api-routes');

function server(req, res) {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, '');

  if (trimmedPath === 'api') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ welcome: 'API router' }));
  } else {
    routes(req, res, trimmedPath);
  }
}

module.exports = server;
