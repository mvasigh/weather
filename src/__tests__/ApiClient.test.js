import fetchMock from 'jest-fetch-mock';
import { DEFAULT_BASE_URL } from 'shared/constants';
import { Client } from 'util/ApiClient';

describe('ApiClient', () => {
  it('instantiates properly', () => {
    const client = new Client();
    expect(client.baseUrl).toBe(DEFAULT_BASE_URL);
  });

  describe('fetch', () => {
    let client;
    const appId = 'abc123';
    const response = { foo: 'bar' };

    beforeEach(() => (client = new Client({ fetch: fetchMock, appId })));

    afterEach(() => (client = null));

    it('can make a request with fetch', async () => {
      fetchMock.mockResponseOnce(() => Promise.resolve(JSON.stringify(response)));
      expect(client.get()).resolves.toMatchObject(response);
    });

    it('can make a request with given endpoint', async () => {
      fetchMock.mockResponseOnce((req) => Promise.resolve(JSON.stringify({ url: req.url })));
      const { url } = await client.get('/forecast');
      expect(url).toEqual(expect.stringContaining('/forecast'));
    });

    it('can make a request with API key', async () => {
      fetchMock.mockResponseOnce((req) => Promise.resolve(JSON.stringify({ url: req.url })));
      const { url } = await client.get();
      expect(url).toEqual(expect.stringContaining('appId=' + appId));
    });
  });
});
