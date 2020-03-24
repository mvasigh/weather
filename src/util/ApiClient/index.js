import Client from './Client';
import { API_KEY, DEFAULT_BASE_URL } from 'shared/constants';

export { Client };
export default new Client({
  appId: API_KEY,
  baseUrl: DEFAULT_BASE_URL,
  fetch: fetch,
});
