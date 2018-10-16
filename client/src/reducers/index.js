import { combineReducers } from 'redux';
import projectReducer from './projectReducer.js'; 

const rootReducer = combineReducers({
  state: projectReducer
});

export default rootReducer;
