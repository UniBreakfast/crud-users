module.exports = { getPayload };

async function getPayload(request) {
  let body = '';

  for await (const chunk of request) body += chunk;

  try { return JSON.parse(body); }
  catch { return body; }
}   
