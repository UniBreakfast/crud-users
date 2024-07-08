module.exports = { provideAPI };

const { getCookie, getPayload } = require('./cookie-payload.js');
const { register, setPwd } = require('./pass-work.js');

async function provideAPI(
  request, response, { createUser, readUsers, updateUser, deleteUser } // project://restricted/crud.js
) {
  const { method, url } = request;
  const endpoint = url.replace(/^\/api\//, '');

  if (method === 'GET' && endpoint === 'users') {
    const users = await readUsers();
    const json = JSON.stringify(users);

    response.setHeader('Content-Type', 'application/json; charset=utf-8');
    response.end(json);

  } else if (method === 'GET' && endpoint === 'user.js') {
    const { token } = getCookie(request);

    if (token === '1234') {
      const fileContent = `\nvar user = ${JSON.stringify({
          id: '6687ca1557517458845b9442',
          login: 'admin',
          name: 'Administrator',
          role: 'admin'
        }, null, 2)};
      `;

      response.end(fileContent);
    } else {
      const fileContent = `\nvar user = ${JSON.stringify({role: 'guest'}, null, 2)};
      `;

      response.end(fileContent);
    }

  } else if (method === 'POST' && endpoint === 'user') {
    const { login, name, password, role } = await getPayload(request);
    const id = await register(createUser, { login, name, password, role });

    const json = JSON.stringify({ id });

    response.setHeader('Content-Type', 'application/json');
    response.end(json);

  } else if (method === 'PUT' && endpoint === 'user') {
    const { id, login, name, role } = await getPayload(request);

    await updateUser(id, { login, name, role });

    response.end();

  } else if (method === 'DELETE' && endpoint === 'user') {
    const { id } = await getPayload(request);

    await deleteUser(id);

    response.end();

  } else if (method === 'PUT' && endpoint === 'updpwd') {
    const { id, password } = await getPayload(request);

    await setPwd(updateUser, { id, password });

    response.end();

  } else {
    response.writeHead(404);
    response.end(`incorrect method ${method} or path ${url}`);
  }
}
