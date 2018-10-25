import {
  LOGIN_USER,
  ERROR_LOGIN,
  FETCH_USER
} from '../actions/types';

export default function (state = null, action) {
  switch (action.type) {
    
    case LOGIN_USER:
      return action.payload;
    
    case ERROR_LOGIN: 
     return action.payload;

    case FETCH_USER:
     return action.payload;
      
    default:
      return state;
  }
}
