export function getCookieItem(key: string): string {
  return ('; ' + document.cookie).split('; ' + key + '=').pop().split(';').shift();
}

export function setCookieItem(key: string, value: string) {
  document.cookie = `${key}=${value}; `
}
