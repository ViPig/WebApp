export const SHOW_LEFT_DRAWER = 'SHOW_LEFT_DRAWER';
export const HIDE_LEFT_DRAWER = 'HIDE_LEFT_DRAWER';

export function showLeftDrawer(value) {
  return {
    type: SHOW_LEFT_DRAWER,
    value,
  };
}

export function hideLeftDrawer() {
  return {
    type: HIDE_LEFT_DRAWER,
  };
}
