import { combineReducers } from 'redux';
import { reducer as formReducer } from 'demoReducer';

export default combineReducers({
  demo: formReducer,
});
