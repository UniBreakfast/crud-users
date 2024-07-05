export { get, post, put, destroy };

function get(endpoint) {
  return fetch('/api/' + endpoint).then(r => r.json());
}

function post(endpoint, data) {
  return fetch('/api/' + endpoint, {
    method: 'POST',
    headers: {'Content-Type': 'application/json; charset=utf-8'},
    body: JSON.stringify(data),
  }).then(r => r.json());
}

function put(endpoint, data) {
  return fetch('/api/' + endpoint, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json; charset=utf-8'},
    body: JSON.stringify(data),
  }).then(r => r.json());
}

function destroy(endpoint, data) {
  return fetch('/api/' + endpoint, {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json; charset=utf-8'},
    body: JSON.stringify(data),
  }).then(r => r.text()).then(text => {
    try {
      return JSON.parse(text);
    } catch {
      return text;
    }
  });
}
