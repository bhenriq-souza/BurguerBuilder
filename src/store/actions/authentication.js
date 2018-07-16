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
                const idToken = response.data.idToken, localId = response.data.localId, expiresIn = response.data.expiresIn;
                const expirationTime = new Date().getTime() + ( expiresIn * 1000 );
                const expirationDate = new Date(expirationTime);
                localStorage.setItem('token', idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', localId);
                const payload = {
                    idToken: idToken, 
                    userId: localId 
                };
                dispatch(authSuccess(payload));
                dispatch(checkAuthTime(expiresIn));
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
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const setAuthRedirectPath = path => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            const userId = localStorage.getItem('userId');
            const timeToExpires = (expirationDate.getTime() - new Date().getTime()) / 1000;
            if(expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                dispatch(authSuccess({ idToken: token, userId: userId }));
                dispatch(checkAuthTime(timeToExpires));                
            }            
        }
    }
};