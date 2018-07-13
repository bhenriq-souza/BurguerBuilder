import axios from 'axios';
import * as actionTypes from './actionTypes';

let AUTH_URL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/#isSignup#?key=AIzaSyCiD8bJZyT_2kkDqmhthz1mr-7nUCmZ2oI';

export const authenticateUser = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };

        let method = '', url = '';
        method = isSignup ? 'signupNewUser' : 'verifyPassword';
        url = AUTH_URL.replace('#isSignup#', method);    

        axios.post(url, authData)
            .then( response => {
                const payload = {
                    idToken: response.data.idToken, 
                    userId: response.data.localId 
                };
                dispatch(authSuccess(payload));
                dispatch(checkAuthTime(response.data.expiresIn));
            })
            .catch( error => {
                dispatch(authFailed(error.response.data.error));
            });        
    };
};

export const checkAuthTime = (expiresTime) => {
    return dispatch => {
        setTimeout( () => {
            dispatch(logout());
        }, expiresTime * 1000);
    };
};

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = payload => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        payload: payload
    };
};

export const authFailed = error => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    };
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
};