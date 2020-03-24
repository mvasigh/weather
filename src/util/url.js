export function resolve(...fragments) {
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
