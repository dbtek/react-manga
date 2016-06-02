/**
 * A resource module to interact with REST api. Exports get, save, udpate, remove methods.
 */

// Api base url.
const apiUrl = 'https://www.mangaeden.com/api';
import fetch from 'isomorphic-fetch';

function serialize(obj) {
  var str = [];
  for(var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}

/**
 * Higher level fetch method. Deals with status code checks.
 * @param  {String} url  Resource url
 * @param  {Object} opts fetch options.
 * @return {Promise}     Response promise.
 */
let _fetch = async function(url, opts) {
  try {
    const response = await fetch(url, opts);
    if(response.status == 200)
      return response;
    else
      throw new Error(`Probably bad request, status: ${response.status}.`);
  }
  catch (e) {
    console.error(`An error occured while fetching ${url}`, e.stack);
  }
};

// fetches an endpoint
export async function get(endpoint, params) {
  let serializedParams = '';
  if(params)
    serializedParams = '?' + serialize(params);
  const response = await _fetch(`${apiUrl}/${endpoint}${serializedParams}`);

  return await response.json();
}

// creates a new model record
export async function save(endpoint, data) {
  let method = 'POST'; // default method
  if(data.id) { // change method to PUT if there is an id in object
    method = 'PUT';
  }
  const response = await _fetch(`${apiUrl}/${endpoint}`, {
      method: method,
      body: JSON.stringify(data)
    })
  return await response.json();
}

// updates an existing record
export async function update(endpoint, data) {
  const response = await _fetch(`${apiUrl}/${endpoint}`, {
      method: 'PUT',
      body: data
    })
  return await response.json();
}

// deletes an existing record
export async function remove(endpoint) {
  const response = await _fetch(`${apiUrl}/${endpoint}`, {
      method: 'DELETE',
      body: data
    })
  return await response.json();
}
