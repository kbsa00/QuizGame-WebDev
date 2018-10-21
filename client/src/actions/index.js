import {LOGIN_USER} from './types';
import axios from 'axios';



export const UserloginAction = (values) => async (dispatch) => {
    const res = await axios.post('http://localhost:3000/api/login', values);
    dispatch({
        type: LOGIN_USER,
        payload: res.data
    });
}


