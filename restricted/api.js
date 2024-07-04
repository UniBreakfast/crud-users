module.exports = { provideAPI };

async function provideAPI(request, response, { readUsers }) {
  const { method, url } = request;

  if (method === 'GET' && url === '/api/users') {
    const users = await readUsers();
    const json = JSON.stringify(users);
    
    response.setHeader('Content-Type', 'application/json; charset=utf-8');
    response.end(json);

  } else {
    response.writeHead(404);
    response.end(`incorrect method ${method} or path ${url}`);
  }
}
