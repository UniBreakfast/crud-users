module.exports = { getCookie, getPayload };

function getCookie(request) {
  const cookie = request.headers.cookie;

  return Object.fromEntries(cookie?.split(';').map(pair => pair.split('=')) ?? []);
}

async function getPayload(request) {
  let body = '';

  for await (const chunk of request) body += chunk;

  try { return JSON.parse(body); }
  catch { return body; }
}   
