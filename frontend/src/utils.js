export function generateURLSearchString(search, params) {
  const parsedSearch = new URLSearchParams(search);
  params?.forEach(param => parsedSearch.set(param.attribute, param.value));
  return parsedSearch.toString();
}

export function getURLSearchObject(search) {
  const parsedSearch = new URLSearchParams(search);
  return parsedSearch;
}

export function arrayEquals(a, b) {
  return Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index]);
}