import {
    LOGIN_USER,
    ERROR_LOGIN
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
            payload: null
        })    
    }
}