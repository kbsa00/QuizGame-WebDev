import {
    LOGIN_USER,
    ERROR_LOGIN,
    FETCH_USER, 
    CREATE_USER
} from './types';
import axios from 'axios';

export const UserloginAction = (values, history) => async (dispatch) => {
    try {
        const res = await axios.post('/api/login', values);
        dispatch({
            type: LOGIN_USER,
            payload: res.data
        });
        history.push('/');
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
        console.log(res.data); 
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


export const createUser = (values, history) => async(dispatch) => {
    axios
    .post('/api/register', values)
    .then(() =>{
       history.push('/login');
    })
    .catch(err => {
        dispatch({
            type: ERROR_LOGIN,
            payload: false,
            error: 'Email or Username already exist'
        });
    })
}