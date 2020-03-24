const queryString = require('query-string');
const fetch = require('isomorphic-unfetch');

const baseUrl = 'https://api.openweathermap.org/data/2.5';

function resolve(...fragments) {
  if (!fragments.length) {
    return '/';
  }
  const [from, ...to] = fragments;
  let url = from;
  while (to.length) {
    url = url.replace(/\/$/g, '');
    url += '/' + to.shift().replace(/^\/(?!\/)/g, '');
  }
  url = url.replace(/\/$/g, '');
  return url;
}

exports.handler = (event, context, callback) => {
  if (event.httpMethod && event.httpMethod.toUpperCase() !== 'GET') {
    callback(null, {
      statusCode: 504,
      body: 'Method not allowed',
    });
  }

  const endpoint = event.path.replace('/.netlify/functions/api', '');
  const api_key = process.env.WEATHER_API_KEY;
  const query = event.queryStringParameters;
  query.appId = api_key;

  const _query = Object.keys(query).length ? `?${queryString.stringify(query)}` : '';
  const _url = resolve(baseUrl, endpoint) + _query;
  
  fetch(_url)
    .then((res) => res.json())
    .then((json) => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(json),
      });
    });
};
