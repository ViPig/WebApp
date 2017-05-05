import { combineReducers } from 'redux';
import leftDrawer from './LeftDrawerReducer';
import loginModal from './LoginModalReducer';

export default combineReducers({
  leftDrawer,
  loginModal,
});
