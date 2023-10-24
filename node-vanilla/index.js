require('dotenv').config();
const http = require('http');
const server = require('./api/server');

const port = process.env.PORT || 5555;
const hostname = '127.0.0.1';

const httpServer = http.createServer(server);

httpServer.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
