import axios from 'axios';
import {FETCH_USER} from './types'

// Produce an action and utilize redux-thunk
// to manually send the result of the async 
// action to the reducers 
export const fetchUser = ( ) => async dispatch => {
    const res = await axios.get('/api/current_user');
    dispatch({type:FETCH_USER, payload:res.data});
    
};

export const handleToken = (token) => async dispatch => {
    const res = await axios.post('/api/stripe', token);
    dispatch({type:FETCH_USER, payload:res.data});
};

export const submitSurvey = (values) => async dispatch => {
   return {type: 'submit_survey'}
};