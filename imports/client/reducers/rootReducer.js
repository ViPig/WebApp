import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';

import leftDrawer from './LeftDrawerReducer';
import loginModal from './LoginModalReducer';
import loginReducer from './LoginReducer';
import processModal from './ProcessModalReducer';

export default combineReducers({
  leftDrawer,
  loginModal,
  loginReducer,
  processModal,
  form: reduxFormReducer,
});
