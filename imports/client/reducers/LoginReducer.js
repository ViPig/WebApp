import { LOGIN, LOGOUT } from '../actions/setLoginState';

const initialState = {
  Logged: false,
  value: '',
};

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
    //   //console.log('SHOW_LOGIN_MODAL');
      return Object.assign({}, state, {
        Logged: true,
      });
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export default loginReducer;
