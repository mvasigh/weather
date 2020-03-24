import * as url from 'util/url';

describe('utils/url', () => {
  test('resolve', () => {
    const testUrls = [
      {
        urls: ['https://localhost:3000/', '/api/'],
        expected: 'https://localhost:3000/api',
      },
      {
        urls: ['https://google.com', 'api', 'v1/', '/users'],
        expected: 'https://google.com/api/v1/users',
      },
      {
        urls: ['https://facebook.com', 'api/', '/v1/', 'users/'],
        expected: 'https://facebook.com/api/v1/users',
      },
      {
        urls: ['resource', '1234', 'child', '5678'],
        expected: 'resource/1234/child/5678',
      },
      {
        urls: [],
        expected: '/',
      },
    ];
    for (let { expected, urls } of testUrls) {
      expect(url.resolve(...urls)).toEqual(expected);
    }
  });
});
