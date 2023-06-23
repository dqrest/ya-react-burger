import {
    REGISTER_USER_FAILED
    , REGISTER_USER_REQUEST
    , REGISTER_USER_SUCCESS
    , REFRESH_REGISTERING

    , LOGIN_USER_FAILED
    , LOGIN_USER_SUCCESS
    , LOGIN_USER_REQUEST

    , LOGOUT_USER_FAILED
    , LOGOUT_USER_SUCCESS
    , LOGOUT_USER_REQUEST

    , FORGOT_PASSWORD_FAILED
    , FORGOT_PASSWORD_SUCCESS
    , FORGOT_PASSWORD_REQUEST
    , REFRESH_FORGOTING_PASSWORD

    , RESET_PASSWORD_FAILED
    , RESET_PASSWORD_SUCCESS
    , RESET_PASSWORD_REQUEST

    , GET_USER_FAILED
    , GET_USER_SUCCESS
    , GET_USER_REQUEST

    , PATCH_USER_REQUEST
    , PATCH_USER_SUCCESS
    , PATCH_USER_FAILED
} from '../action-types/auth';

import { authReducer, registerReducer, forgotPasswordReducer, resetPasswordReducer } from './auth';

let authState = undefined;
let registerState = undefined;
let forgotState = undefined;
let resetState = undefined;
const accessToken = 'Bearer token';
const refreshToken = 'refreshToken';
const user = {
    name: 'Tom',
    password: 'tom12345',
    email: 'tom@tandex.ru'
};
const loginUserFailedMessage = 'login failed';
const logoutUserFailedMessage = 'logout failed';
const getUserFailedMessage = 'get user failed';
const patchUserFailedMessage = 'patch user failed';
const registerUserFailedMessage = 'register user failed';
const forgotPasswordFailedMessage = 'forgot password failed';
const forgotPasswordEmail = "tomforgot@yandex.ru";
const resetPasswordFailedMessage = 'reset password failed';
const resetPasswordSuccessMessage = 'reset password success';


describe('auth reducer', () => {

    // authReducer

    it('should return the initial state', () => {
        expect(authReducer(authState, {})).toEqual({
            user: null
            , message: null
            , request: false
            , failed: false
            , accessToken: null
            , refreshToken: null
            , actionType: undefined
        });

        authState = {
            user: null
            , message: null
            , request: false
            , failed: false
            , accessToken: null
            , refreshToken: null
            , actionType: undefined
        };
    })

    it('should login user request', () => {

        expect(authReducer(authState, { type: LOGIN_USER_REQUEST }))
            .toEqual({ ...authState, request: true, actionType: LOGIN_USER_REQUEST });

        authState = { ...authState, request: true, actionType: LOGIN_USER_REQUEST };
    })

    it('should login user success', () => {
        expect(authReducer(authState, {
            type: LOGIN_USER_SUCCESS
            , accessToken
            , refreshToken
            , user
        })).toEqual({
            ...authState
            , request: false
            , failed: false
            , user
            , accessToken
            , refreshToken
            , actionType: LOGIN_USER_SUCCESS
        });

        authState = {
            ...authState
            , request: false
            , failed: false
            , user
            , accessToken
            , refreshToken
            , actionType: LOGIN_USER_SUCCESS
        };
    })

    it('should login user failed', () => {
        expect(authReducer(authState, {
            type: LOGIN_USER_FAILED
            , message: loginUserFailedMessage
        })).toEqual({
            ...authState
            , request: false
            , failed: true
            , message: loginUserFailedMessage
            , user: null
            , actionType: LOGIN_USER_FAILED
        });

        authState = {
            user
            , message: null
            , request: false
            , failed: false
            , actionType: LOGIN_USER_SUCCESS
        };
    })

    it('should logout user request', () => {
        expect(authReducer(authState, {
            type: LOGOUT_USER_REQUEST
        })).toEqual({ ...authState, request: true, actionType: LOGOUT_USER_REQUEST });
        authState = { ...authState, request: true, actionType: LOGOUT_USER_REQUEST };
    })

    it('should logout user success', () => {
        expect(authReducer(authState, {
            type: LOGOUT_USER_SUCCESS
            , accessToken
            , refreshToken
            , user
        })).toEqual({
            ...authState
            , request: false
            , failed: false
            , user
            , accessToken
            , refreshToken
            , actionType: LOGOUT_USER_SUCCESS
        });
        authState = {
            ...authState
            , request: false
            , failed: false
            , user
            , accessToken
            , refreshToken
            , actionType: LOGOUT_USER_SUCCESS
        };
    })

    it('should logout user failed', () => {
        expect(authReducer(authState, {
            type: LOGOUT_USER_FAILED
            , message: logoutUserFailedMessage
        })).toEqual({
            ...authState
            , request: false
            , failed: true
            , message: logoutUserFailedMessage
            , actionType: LOGOUT_USER_FAILED
        });
        authState = {
            ...authState
            , request: false
            , failed: true
            , message: logoutUserFailedMessage
            , actionType: LOGOUT_USER_FAILED
        };
    })

    it('should GET_USER_REQUEST', () => {
        expect(authReducer(authState, {
            type: GET_USER_REQUEST
        })).toEqual({
            ...authState
            , request: true
            , actionType: GET_USER_REQUEST
        });
        authState = {
            ...authState
            , request: true
            , actionType: GET_USER_REQUEST
        };
    })

    it('should PATCH_USER_REQUEST', () => {
        expect(authReducer(authState, {
            type: PATCH_USER_REQUEST
        })).toEqual({
            ...authState
            , request: true
            , actionType: PATCH_USER_REQUEST
        });
        authState = {
            ...authState
            , request: true
            , actionType: PATCH_USER_REQUEST
        };
    })

    it('should GET_USER_SUCCESS', () => {
        expect(authReducer(authState, {
            type: GET_USER_SUCCESS
            , user
        })).toEqual({
            ...authState
            , request: false
            , failed: false
            , user
            , actionType: GET_USER_SUCCESS
        });
        authState = {
            ...authState
            , request: false
            , failed: false
            , user
            , actionType: GET_USER_SUCCESS
        };
    })

    it('should PATCH_USER_SUCCESS', () => {
        expect(authReducer(authState, {
            type: PATCH_USER_SUCCESS
            , user
        })).toEqual({
            ...authState
            , request: false
            , failed: false
            , user
            , actionType: PATCH_USER_SUCCESS
        });
        authState = {
            ...authState
            , request: false
            , failed: false
            , user
            , actionType: PATCH_USER_SUCCESS
        };
    })

    it('should GET_USER_FAILED', () => {
        expect(authReducer(authState, {
            type: GET_USER_FAILED
            , message: getUserFailedMessage
        })).toEqual({
            ...authState
            , request: false
            , failed: true
            , message: getUserFailedMessage
            , actionType: GET_USER_FAILED
        });
        authState = {
            ...authState
            , request: false
            , failed: true
            , message: getUserFailedMessage
            , actionType: GET_USER_FAILED
        };
    })

    it('should PATCH_USER_FAILED', () => {
        expect(authReducer(authState, {
            type: PATCH_USER_FAILED
            , message: patchUserFailedMessage
        })).toEqual({
            ...authState
            , request: false
            , failed: true
            , message: patchUserFailedMessage
            , actionType: PATCH_USER_FAILED
        });
        authState = {
            ...authState
            , request: false
            , failed: true
            , message: patchUserFailedMessage
            , actionType: PATCH_USER_FAILED
        };
    })

    // registerReducer

    it('should return register initial state', () => {
        expect(registerReducer(registerState, {}))
            .toEqual({
                user: null
                , message: null
                , registerRequest: false
                , registerFailed: false
            });
        registerState = {
            user: null
            , message: null
            , registerRequest: false
            , registerFailed: false
        };
    })

    it('should REGISTER_USER_REQUEST', () => {
        expect(registerReducer(registerState, {
            type: REGISTER_USER_REQUEST          
        }))
            .toEqual({ ...registerState, registerRequest: true  });
        registerState = { ...registerState, registerRequest: true  };
    })

    it('should REGISTER_USER_SUCCESS', () => {
        expect(registerReducer(registerState, {
            type: REGISTER_USER_SUCCESS
            , user
        }))
            .toEqual({ ...registerState, registerRequest: false, registerFailed: false, user });
        registerState = { ...registerState, registerRequest: false, registerFailed: false, user };
    })

    it('should REGISTER_USER_FAILED', () => {
        expect(registerReducer(registerState, {
            type: REGISTER_USER_FAILED
            , message: registerUserFailedMessage
        }))
            .toEqual({ ...registerState, registerRequest: false, registerFailed: true, message: registerUserFailedMessage });
        registerState = { ...registerState, registerRequest: false, registerFailed: true, message: registerUserFailedMessage };
    })

    it('should REFRESH_REGISTERING', () => {
        expect(registerReducer(registerState, {
            type: REFRESH_REGISTERING
            , registerFailed: false
            , registerRequest: false
        }))
            .toEqual({ ...registerState, registerRequest: false, registerFailed: false });
        registerState = { ...registerState, registerRequest: false, registerFailed: false };
    })

    // forgotPasswordReducer

    it('should return forgot initial state', () => {
        expect(forgotPasswordReducer(forgotState, {}))
            .toEqual({
                email: null
                , message: null
                , forgotPasswordRequest: false
                , forgotPasswordFailed: false
            });
        forgotState = {
            email: null
            , message: null
            , forgotPasswordRequest: false
            , forgotPasswordFailed: false
        };
    })

    it('should FORGOT_PASSWORD_REQUEST', () => {
        expect(forgotPasswordReducer(forgotState, {
            type: FORGOT_PASSWORD_REQUEST
        }))
            .toEqual({ ...forgotState, forgotPasswordRequest: true });
        forgotState = { ...forgotState, forgotPasswordRequest: true };
    })

    it('should FORGOT_PASSWORD_SUCCESS', () => {
        expect(forgotPasswordReducer(forgotState, {
            type: FORGOT_PASSWORD_SUCCESS
            , email: forgotPasswordEmail
        }))
            .toEqual({ ...forgotState, forgotPasswordRequest: false, forgotPasswordFailed: false, email: forgotPasswordEmail });
        forgotState = { ...forgotState, forgotPasswordRequest: false, forgotPasswordFailed: false, email: forgotPasswordEmail };
    })

    it('should FORGOT_PASSWORD_FAILED', () => {
        expect(forgotPasswordReducer(forgotState, {
            type: FORGOT_PASSWORD_FAILED
            , message: forgotPasswordFailedMessage
        }))
            .toEqual({ ...forgotState, forgotPasswordRequest: false, forgotPasswordFailed: true, message: forgotPasswordFailedMessage });
        forgotState = { ...forgotState, forgotPasswordRequest: false, forgotPasswordFailed: true, message: forgotPasswordFailedMessage };
    })

    it('should REFRESH_FORGOTING_PASSWORD', () => {
        expect(forgotPasswordReducer(forgotState, {
            type: REFRESH_FORGOTING_PASSWORD
            , forgotPasswordRequest: false
            , forgotPasswordFailed: false
        }))
            .toEqual({ ...forgotState, forgotPasswordRequest: false, forgotPasswordFailed: false });
        forgotState = { ...forgotState, forgotPasswordRequest: false, forgotPasswordFailed: false };
    })

    // resetPasswordReducer

    it('should return reset initial state', () => {
        expect(resetPasswordReducer(resetState, {}))
            .toEqual({
                message: null
                , resetPasswordRequest: false
                , resetPasswordFailed: false
            });
        resetState = {
            message: null
            , resetPasswordRequest: false
            , resetPasswordFailed: false
        };
    })

    it('should RESET_PASSWORD_REQUEST', () => {
        expect(resetPasswordReducer(resetState, { type: RESET_PASSWORD_REQUEST }))
            .toEqual({ ...resetState, resetPasswordRequest: true });
        resetState = { ...resetState, resetPasswordRequest: true };
    })

    it('should RESET_PASSWORD_SUCCESS', () => {
        expect(resetPasswordReducer(resetState, {
            type: RESET_PASSWORD_SUCCESS
            , message: resetPasswordSuccessMessage
        }))
            .toEqual({ ...resetState, resetPasswordRequest: false, resetPasswordFailed: false, message: resetPasswordSuccessMessage });
        resetState = { ...resetState, resetPasswordRequest: false, resetPasswordFailed: false, message: resetPasswordSuccessMessage };
    })

    it('should RESET_PASSWORD_FAILED', () => {
        expect(resetPasswordReducer(resetState, {
            type: RESET_PASSWORD_FAILED
            , message: resetPasswordFailedMessage
        }))
            .toEqual({ ...resetState, resetPasswordRequest: false, resetPasswordFailed: true, message: resetPasswordFailedMessage });
        resetState = { ...resetState, resetPasswordRequest: false, resetPasswordFailed: true, message: resetPasswordFailedMessage };
    })











});


