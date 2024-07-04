module.exports = {runServer};

const { log } = require('console');
const { createServer } = require('http');
const { handleRequest } = require('./handle-request.js');

function runServer(port) {
  const handleWithoutDB = handleRequest({});
  const server = createServer(handleWithoutDB);
  
  server.listen(port, () => log('http://localhost:' + port));

  return {
    use(mong) {
      server.off('request', handleWithoutDB)
        .on('request', handleRequest(mong))
    }
  }
}
