import { combineReducers } from 'redux';
import projectReducer from './projectReducer.js';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  state: projectReducer,
  form: formReducer
});

export default rootReducer;
