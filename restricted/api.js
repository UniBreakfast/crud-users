module.exports = { provideAPI };

const { getPayload } = require('./payload.js');

async function provideAPI(request, response, { createUser, readUsers, deleteUser }) {
  const { method, url } = request;
  const endpoint = url.replace(/^\/api\//, '');

  if (method === 'GET' && endpoint === 'users') {
    const users = await readUsers();
    const json = JSON.stringify(users);
    
    response.setHeader('Content-Type', 'application/json; charset=utf-8');
    response.end(json);

  } else if (method === 'POST' && endpoint === 'user') {
    const { login, name } = await getPayload(request);
    const user = { login, name };
    const id = await createUser(user);
    
    const json = JSON.stringify({ id });

    response.setHeader('Content-Type', 'application/json');
    response.end(json);

  } else if (method === 'DELETE' && endpoint === 'user') {
    const { id } = await getPayload(request);
    
    await deleteUser(id);
    
    response.end();

  } else {
    response.writeHead(404);
    response.end(`incorrect method ${method} or path ${url}`);
  }
}
