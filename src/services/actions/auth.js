import {
    registerRequest
    , loginRequest
    , forgotPasswordRequest
} from '../../utils/auth-api';

export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILED = 'REGISTER_USER_FAILED';

export const REFRESH_REGISTERING = 'REFRESH_REGISTERING';

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILED = 'LOGIN_USER_FAILED';

export const REFRESH_LOGINING = 'REFRESH_LOGINING';

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED';

export const REFRESH_FORGOTING_PASSWORD = 'REFRESH_FORGOTING_PASSWORD';

export function register(formData) {
    return function (dispatch) {
        dispatch({ type: REGISTER_USER_REQUEST });
        registerRequest(formData)
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: REGISTER_USER_SUCCESS,
                        user: {
                            email: res.email
                            , name: res.name
                        }
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

export function login(formData) {
    return function (dispatch) {
        dispatch({ type: LOGIN_USER_REQUEST });
        loginRequest(formData)
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: LOGIN_USER_SUCCESS,
                        user: {
                            email: res.email
                            , name: res.name
                        }
                    });
                    return;
                }
                dispatch({ type: LOGIN_USER_FAILED });
            })
            .catch(e => dispatch({ type: LOGIN_USER_FAILED, message: e.message }));
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
                        user: {
                            email: res.email
                            , name: res.name
                        }
                    });
                    return;
                }
                dispatch({ type: FORGOT_PASSWORD_FAILED });
            })
            .catch(e => dispatch({ type: FORGOT_PASSWORD_FAILED, message: e.message }));
    };
}

export const refreshForgotingPassword = () => (
    { type: REFRESH_FORGOTING_PASSWORD, forgotPasswordRequest: false, forgotPasswordFailed: false }
);