import { SHOW_LEFT_DRAWER, HIDE_LEFT_DRAWER } from '../actions/setLeftDrawerVisible';

const initialState = {
  showLD: false,
};

function leftDrawer(state = initialState, action) {
  switch (action.type) {
    case SHOW_LEFT_DRAWER:
      return Object.assign({}, state, {
        showLD: action.value,
      });
    case HIDE_LEFT_DRAWER:
      return initialState;
    default:
      return state;
  }
}
export default leftDrawer;
