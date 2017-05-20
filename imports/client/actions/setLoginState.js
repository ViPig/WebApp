export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export function login(value) {
  return {
    type: LOGIN,
    value,
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}
