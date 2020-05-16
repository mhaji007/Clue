import axios from 'axios';
import {FETCH_USER} from './types'

// Produce an action and utilize redux-thunk
// to manually send the result of the async 
// action to the reducers 
export const fetchUser = ( ) => {
    // Wait for the async action to complete and
    // only then dispatch the action to the reducers
    return function (dispatch) {
        axios.get('/api/current_user').then(res=>dispatch({type:FETCH_USER, payload:res}));
    }
}