module.exports = {handleRequest};

const { provideAPI } = require('./api.js');
const { serveFile } = require('./serve-file.js');

function handleRequest(mong) {
  return async (request, response) => {
    const { url } = request;
    
    if (url.startsWith('/api/')) {
      provideAPI(request, response, mong);
    } else {
      serveFile(request, response);
    }
  }
}
