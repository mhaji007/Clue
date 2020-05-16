import axios from 'axios';
import {FETCH_USER} from './types'

// Produce an action and utilize redux-thunk
// to manually send the result of the async 
// action to the reducers 
export const fetchUser = ( ) => async dispatch => {
       const res = await axios.get('/api/current_user');
    dispatch({type:FETCH_USER, payload:res});
    
};