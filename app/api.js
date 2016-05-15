const apiUrl = 'https://www.mangaeden.com/api/';

function serialize(obj) {
  var str = [];
  for(var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}

// fetches an endpoint
export function get(endpoint, params) {
  let serializedParams = '';
  if(params)
    serializedParams = '?' + serialize(params);
  return fetch(`${apiUrl}/${endpoint}${serializedParams}`)
    .then(response => response.json());
}

// creates a new model record
export function save(endpoint, data) {
  let method = 'POST'; // default method
  if(data.id) { // change method to PUT if there is an id in object
    method = 'PUT';
  }
  return fetch(`${apiUrl}/${endpoint}`, {
      method: method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json());
}

// updates an existing record
export function update(endpoint, data) {
  return fetch(`${apiUrl}/${endpoint}`, {
      method: 'PUT',
      body: data
    })
    .then(response => response.json());
}

// deletes an existing record
export function remove(endpoint) {
  return fetch(`${apiUrl}/${endpoint}`, {
      method: 'DELETE',
      body: data
    })
    .then(response => response.json());
}
