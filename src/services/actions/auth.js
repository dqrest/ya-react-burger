import {
    registerRequest
    , loginRequest
    , logoutRequest
    , forgotPasswordRequest
    , resetPasswordRequest
    , getUserRequest
    , patchUserRequest
    , refreshTokenRequest
} from '../../utils/auth-api';


export const SET_USER = 'SET_USER';

export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILED = 'REGISTER_USER_FAILED';

export const REFRESH_REGISTERING = 'REFRESH_REGISTERING';

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILED = 'LOGIN_USER_FAILED';

export const LOGOUT_USER_REQUEST = 'LOGOUT_USER_REQUEST';
export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS';
export const LOGOUT_USER_FAILED = 'LOGOUT_USER_FAILED';

export const REFRESH_LOGINING = 'REFRESH_LOGINING';

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED';

export const REFRESH_FORGOTING_PASSWORD = 'REFRESH_FORGOTING_PASSWORD';

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';

export const PATCH_USER_REQUEST = 'PATCH_USER_REQUEST';
export const PATCH_USER_SUCCESS = 'PATCH_USER_SUCCESS';
export const PATCH_USER_FAILED = 'PATCH_USER_FAILED';

export const REFRESH_TOKEN_REQUEST = 'REFRESH_TOKEN_REQUEST';
export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_FAILED = 'REFRESH_TOKEN_FAILED';


export function register(formData) {
    return function (dispatch) {
        dispatch({ type: REGISTER_USER_REQUEST });
        registerRequest(formData)
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: REGISTER_USER_SUCCESS,
                        user: res.user
                    });
                    return;
                }
                dispatch({ type: REGISTER_USER_FAILED });
            })
            .catch(e => dispatch({ type: REGISTER_USER_FAILED, message: e.message }));
    };
}

export const refreshRegistering = () => (
    { type: REFRESH_REGISTERING, registerRequest: false, registerFailed: false }
);

export const setUser = (user) => (
    { type: SET_USER, user: user }
);

export function login(formData) {
    return function (dispatch) {
        dispatch({ type: LOGIN_USER_REQUEST });
        loginRequest(formData)
            .then(res => {
                if (res && res.success) {                    
                    dispatch({
                        type: LOGIN_USER_SUCCESS
                        , user: res.user
                        , refreshToken: res.refreshToken
                        , accessToken: res.accessToken
                    });
                    return;
                }
                dispatch({ type: LOGIN_USER_FAILED });
            })
            .catch(e => dispatch({ type: LOGIN_USER_FAILED, message: e.message }));
    };
}

export function logout(refreshToken) {
    return function (dispatch) {
        dispatch({ type: LOGOUT_USER_REQUEST });
        logoutRequest(refreshToken)
            .then(res => {
                if (res && res.success) {                    
                    dispatch({
                        type: LOGOUT_USER_SUCCESS
                        , user: null
                        , refreshToken: res.refreshToken
                        , accessToken: res.accessToken
                    });
                    return;
                }
                dispatch({ type: LOGOUT_USER_FAILED });
            })
            .catch(e => dispatch({ type: LOGOUT_USER_FAILED, message: e.message }));
    };
}

export const refreshLogining = () => (
    { type: REFRESH_LOGINING, loginRequest: false, loginFailed: false }
);

export function forgotPassword(formData) {
    return function (dispatch) {
        dispatch({ type: FORGOT_PASSWORD_REQUEST });
        forgotPasswordRequest(formData)
            .then(res => {                
                if (res && res.success) {
                    dispatch({
                        type: FORGOT_PASSWORD_SUCCESS,
                        email: formData?.email
                    });
                    return;
                }
                dispatch({ type: FORGOT_PASSWORD_FAILED });
            })
            .catch(e => dispatch({ type: FORGOT_PASSWORD_FAILED, message: e.message }));
    };
}

export function resetPassword(formData){
    return function (dispatch) {
        dispatch({ type: RESET_PASSWORD_REQUEST });
        resetPasswordRequest(formData)
            .then(res => {                
                if (res && res.success) {
                    dispatch({
                        type: RESET_PASSWORD_SUCCESS,
                        email: res.message
                    });
                    return;
                }
                dispatch({ type: RESET_PASSWORD_FAILED });
            })
            .catch(e => {                
                dispatch({ type: RESET_PASSWORD_FAILED, message: e.message });
            });
    }
}

export const refreshForgotingPassword = () => (
    { type: REFRESH_FORGOTING_PASSWORD, forgotPasswordRequest: false, forgotPasswordFailed: false, email: null, message: null }
);

export function getUser(token, refreshToken) {
    return function (dispatch) {
        dispatch({ type: GET_USER_REQUEST });
        if(!token){
            dispatch({ type: GET_USER_FAILED, message: 'Unable to get UserProfile. Empty access token.' });
            return;
        }
        getUserRequest(token, refreshToken)
            .then(res => {                
                if (res && res.success) {                    
                    dispatch({
                        type: GET_USER_SUCCESS
                        , user: res.user                        
                    });
                    return;
                }
                dispatch({ type: GET_USER_FAILED });
            })
            .catch(e => { dispatch({ type: GET_USER_FAILED, message: e.message }); });
    };
}

export function patchUser(accessToken, formData, refreshToken) {
    return function (dispatch) {        
        dispatch({ type: PATCH_USER_REQUEST });
        patchUserRequest(accessToken, formData, refreshToken)
            .then(res => {                
                if (res && res.success) {                    
                    dispatch({
                        type: PATCH_USER_SUCCESS
                        , user: res.user
                        , refreshToken: res.refreshToken
                        , accessToken: res.accessToken
                    });
                    return;
                }
                dispatch({ type: PATCH_USER_FAILED });
            })
            .catch(e => { dispatch({ type: PATCH_USER_FAILED, message: e.message }); });
    };
}

export function refreshAccessToken(refreshToken) {
    return function (dispatch) {        
        dispatch({ type: REFRESH_TOKEN_REQUEST });
        refreshTokenRequest(refreshToken)
            .then(res => {                
                if (res && res.success) {                   
                    dispatch({
                        type: REFRESH_TOKEN_SUCCESS                       
                        , refreshToken: res.refreshToken
                        , accessToken: res.accessToken
                        , message: null
                    });
                    return;
                }
                dispatch({ type: REFRESH_TOKEN_FAILED });
            })
            .catch(e => dispatch({ type: REFRESH_TOKEN_FAILED, message: e.message }));
    };
}