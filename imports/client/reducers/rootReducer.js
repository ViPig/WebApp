import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';

import leftDrawer from './LeftDrawerReducer';
import loginModal from './LoginModalReducer';

export default combineReducers({
  leftDrawer,
  loginModal,
  form: reduxFormReducer,
});
