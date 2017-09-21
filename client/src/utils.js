function getCookie(cookieName) {
  let name = cookieName + '=';
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function isLoggedIn() {
  if (getCookie('username')) return true;
  return false;
}

export function getUser() {
  if (isLoggedIn()) {
    return getCookie('username');
  } else {
    throw new Error('user does not exists');
  }
}

export function loginUser(username, token) {
  document.cookie = 'username=' + username + '; path=/;';
  document.cookie = 'token=' + token + '; path=/;';
}

export function logoutUser() {
  document.cookie = 'username=; expires=Thu, 01 Jan 1993 00:00:00 UTC; path=/;';
  document.cookie = 'token=; expires=Thu, 01 Jan 1993 00:00:00 UTC; path=/;';
}
