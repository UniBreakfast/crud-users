export { get, post, put, destroy };

function get(url) {
  return fetch('/api/' + url).then(r => r.json());
}

function post(url, data) {
  return fetch('/api/' + url, {
    method: 'POST',
    headers: {'Content-Type': 'application/json; charset=utf-8'},
    body: JSON.stringify(data),
  }).then(r => r.json());
}

function put(url, data) {
  return fetch('/api/' + url, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json; charset=utf-8'},
    body: JSON.stringify(data),
  }).then(r => r.json());
}

function destroy(url, data) {
  return fetch('/api/' + url, {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json; charset=utf-8'},
    body: JSON.stringify(data),
  }).then(r => r.json());
}
