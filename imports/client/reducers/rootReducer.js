// import { combineReducers } from 'redux';
import { SHOW_LOGIN_MODAL, HIDE_LOGIN_MODAL } from '../actions/setLoginModalVisible';

const initialState = {
  isShowing: false,
  value: '',
};

function loginModal(state = initialState, action) {
  switch (action.type) {
    case SHOW_LOGIN_MODAL:
    //   console.log('SHOW_LOGIN_MODAL');
      return Object.assign({}, state, {
        isShowing: action.isShowing,
      });
    case HIDE_LOGIN_MODAL:
      return initialState;
    default:
      return state;
  }
}
export default loginModal;
