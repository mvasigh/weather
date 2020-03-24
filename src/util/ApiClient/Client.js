import queryString from 'query-string';
import { DEFAULT_BASE_URL } from 'shared/constants';
import { resolve } from 'util/url';

const ctx = this;

class Client {
  constructor(options = {}) {
    const { appId, baseUrl, fetch: fetchLib } = options;
    this.appId = appId || null;
    this.baseUrl = baseUrl || DEFAULT_BASE_URL;
    this.fetch = (fetchLib || fetch).bind(ctx);
  }

  get = (endpoint = '/', query = {}) => {
    if (this.appId) {
      query.appId = this.appId;
    }
    const _query = Object.keys(query).length ? `?${queryString.stringify(query)}` : '';
    const _url = resolve(this.baseUrl, endpoint) + _query;
    return this.fetch(_url).then((res) => res.json());
  };

  currentWeather = (query = {}) => this.get('/weather', query);

  forecast = (query = {}) => this.get('/forecast', query);
}

export default Client;
