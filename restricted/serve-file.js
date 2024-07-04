module.exports = { serveFile };

const { readFile } = require('fs').promises;
const { guessType } = require('./mime-types.js');

async function serveFile(request, response) {
  const { url } = request;
  const path = url.slice(1) || 'index.html';

  try {
    const fileContent = await readFile('public/' + path);

    response.setHeader('Content-Type', guessType(path));
    response.end(fileContent);

  } catch (error) {
    response.writeHead(404);
    response.end(`file not found: ${url}`);
  }
}
