import {
    LOGIN_USER,
    ERROR_LOGIN,
    FETCH_USER
} from './types';
import axios from 'axios';



export const UserloginAction = (values) => async (dispatch) => {
    try {
        const res = await axios.post('/api/login', values);
        dispatch({
            type: LOGIN_USER,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: ERROR_LOGIN,
            payload: false
        });   
    }
}


export const fetchCurrentUser = () => async(dispatch) => {
    try{
        const res = await axios.get('/api/current_user');
        dispatch({
            type: FETCH_USER,
            payload: res.data
        });
    }catch(error){
        dispatch({
            type: ERROR_LOGIN, 
            payload: false
        });
    }
}