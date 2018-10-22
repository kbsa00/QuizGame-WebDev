import {
  LOGIN_USER,
  ERROR_LOGIN
} from '../actions/types';

export default function (state = null, action) {
  switch (action.type) {
    
    case LOGIN_USER:
      return action.payload;
    
    case ERROR_LOGIN: 
     return action.payload;

    default:
      return state;
  }
}
