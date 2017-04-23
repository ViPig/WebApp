export const SHOW_LOGIN_MODAL = 'SHOW_LOGIN_MODAL';
export const HIDE_LOGIN_MODAL = 'HIDE_LOGIN_MODAL';

export function showLoginModal(isShowing) {
  return {
    type: SHOW_LOGIN_MODAL,
    isShowing,
  };
}

export function hideLoginModal() {
  return {
    type: HIDE_LOGIN_MODAL,
  };
}
