import {createReducer} from '../utils';
import CONSTANTS from '../constants';
//import { pushState } from 'redux-router';
const { FETCH_PROTECTED_DATA_REQUEST, RECEIVE_PROTECTED_DATA,FETCH_ACTIVE_STREAMS} = CONSTANTS
import jwtDecode from 'jwt-decode';

const initialState = {
    data: {
      activeStreams: null
    },
    isFetching: false
};

export default createReducer(initialState, {
    // [RECEIVE_PROTECTED_DATA]: (state, payload) => {
    //     return Object.assign({}, state, {
    //         'data': payload.data,
    //         'isFetching': false
    //     });
    // },
    // [FETCH_PROTECTED_DATA_REQUEST]: (state, payload) => {
    //     return Object.assign({}, state, {
    //         'isFetching': true
    //     });
    // },
    [FETCH_ACTIVE_STREAMS] : (state,payload) =>{
        return Object.assign({}, state, {
            'isFetching': true,
            'data' : {
              activeStreams: payload
            }
        });
    }
});
