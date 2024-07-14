module.exports = { provideAPI };

const { getCookie, getPayload } = require('./cookie-payload.js');
const { register, unregister, setPwd, logIn } = require('./pass-work.js');

async function provideAPI(
  request, response, {
    createUser, readUsers, readUser, updateUser, deleteUser,
    createSession, readSession, deleteSessions, deleteSession,
  } // project://restricted/crud.js
) {
  const { method, url } = request;
  const endpoint = url.replace(/^\/api\//, '');

  response.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (method === 'GET' && endpoint === 'users') {
    const users = await readUsers();
    const json = JSON.stringify(users);

    response.end(json);

  } else if (method === 'GET' && endpoint === 'user.js') {
    const { token } = getCookie(request);
    const session = await readSession({ token });

    if (session) {
      const user = await readUser({ id: session.userId });
      const fileContent = `\nvar user = ${JSON.stringify(user, null, 2)};\n`;

      response.setHeader('Content-Type', 'application/javascript; charset=utf-8');
      response.end(fileContent);
    } else {
      const fileContent = `\nvar user = ${JSON.stringify({ role: 'guest' }, null, 2)};\n`;

      response.end(fileContent);
    }

  } else if (method === 'POST' && endpoint === 'user') {
    const { login, name = login, password, role } = await getPayload(request);
    const id = await register(createUser, { login, name, password, role });

    const json = JSON.stringify({ id });

    response.end(json);

  } else if (method === 'POST' && endpoint === 'login') {
    const { login, password } = await getPayload(request);
    const { token, problem } = await logIn(readUser, createSession, { login, password });

    if (token) {
      response.setHeader('Set-Cookie', `token=${token}; Path=/`);
      response.end('{}');
    } else {
      const json = JSON.stringify({ problem });

      response.statusCode = 401;
      response.end(json);
    }

  } else if (method === 'DELETE' && endpoint === 'logout') {
    const { token } = getCookie(request);

    await deleteSession({ token });

    response.setHeader('Set-Cookie', 'token=; Path=/; Max-Age=0');
    response.end('{}');

  } else if (method === 'PUT' && endpoint === 'user') {
    const { id, login, name, role } = await getPayload(request);

    const updatedFields = Object.fromEntries(
      Object.entries({ login, name, role })
        .filter(([_, v]) => v !== undefined)
    );

    await updateUser(id, updatedFields);

    response.end();

  } else if (method === 'DELETE' && endpoint === 'user') {
    const { id, password } = await getPayload(request);

    if (password) {
      const { problem } = await unregister(readUser, deleteUser, { id, password });

      if (problem) {
        response.statusCode = 401;
        response.end(JSON.stringify({ problem }));
        return;
      } else {
        await deleteSessions(id);
      }
    }

    await deleteUser(id);

    response.end('{}');

  } else if (method === 'PUT' && endpoint === 'setpwd') {
    const { id, password } = await getPayload(request);

    await setPwd(updateUser, { id, password });

    response.end();

  } else if (method === 'PUT' && endpoint === 'changepwd') {
    const { id, password0, password } = await getPayload(request);

    const { problem } = await setPwd(
      updateUser, { id, password0, password }, readUser
    );

    if (problem) {
      response.statusCode = 401;
      response.end(JSON.stringify({ problem }));
    } else {
      response.end('{}');
    }

  } else {
    response.writeHead(404);
    response.end(`incorrect method ${method} or path ${url}`);
  }
}
