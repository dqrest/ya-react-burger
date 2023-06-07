import {
    registerRequest
    , loginRequest
    , logoutRequest
    , forgotPasswordRequest
    , resetPasswordRequest
    , getUserRequest
    , patchUserRequest
} from '../../utils/auth-api';

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

// shared
import {
    TLoginFormData
    , TUserProfileFormData
    , TLoginFormDataResponse
    , TForgotPasswordFormData
    , TResetPasswordFormData
} from '../../shared/types/auth-types';

// action types
import {
    IGetUserAction
    , IGetUserFailedAction
    , IGetUserSuccessAction
    , ILogoutUserAction
    , ILogoutUserFailedAction
    , ILogoutUserSuccessAction
    , ILoginUserAction
    , ILoginUserFailedAction
    , ILoginUserSuccessAction
    , IRegisterUserAction
    , IRegisterUserSuccessAction
    , IRegisterUserFailedAction
    , IRefreshRegistering
    , IPatchUserAction
    , IPatchUserFailedAction
    , IPatchUserSuccessAction
    , IForgotPasswordAction
    , IForgotPasswordFailedAction
    , IForgotPasswordSuccessAction
    , IRefreshForgotingPasswordAction
    , IResetPasswordAction
    , IResetPasswordFailedAction
    , IResetPasswordSuccessAction
} from '../types/auth';
import type { AppDispatch, AppThunkAction } from '../types';


const registerUserAction =
    (): IRegisterUserAction => ({
        type: REGISTER_USER_REQUEST
    });

const registerUserSuccessAction =
    (user: TUserProfileFormData): IRegisterUserSuccessAction => ({
        type: REGISTER_USER_SUCCESS,
        user: user
    });

const registerUserFailedAction =
    (message?: string): IRegisterUserFailedAction => ({
        type: REGISTER_USER_FAILED,
        message: message
    });

export const register = (formData: TUserProfileFormData): AppThunkAction => (dispatch: AppDispatch) => {
    dispatch(registerUserAction());
    registerRequest(formData)
        .then(res => {
            if (res && res.success) {
                dispatch(registerUserSuccessAction(res.user));
                return;
            }
            dispatch(registerUserFailedAction());
        })
        .catch(e => dispatch(registerUserFailedAction(e.message)));
}

export const refreshRegistering = (): IRefreshRegistering => (
    { type: REFRESH_REGISTERING, registerRequest: false, registerFailed: false }
);

const loginUserAction =
    (): ILoginUserAction => ({
        type: LOGIN_USER_REQUEST
    });

const loginUserSuccessAction =
    (user: TLoginFormDataResponse, accessToken?: string, refreshToken?: string,): ILoginUserSuccessAction => ({
        type: LOGIN_USER_SUCCESS,
        user: user,
        refreshToken: refreshToken,
        accessToken: accessToken
    });

const loginUserFailedAction = (message?: string): ILoginUserFailedAction => ({
    type: LOGIN_USER_FAILED,
    message: message
});


const logoutUserAction =
    (): ILogoutUserAction => ({
        type: LOGOUT_USER_REQUEST
    });

const logoutUserSuccessAction =
    (accessToken?: string, refreshToken?: string): ILogoutUserSuccessAction => ({
        type: LOGOUT_USER_SUCCESS,
        accessToken: accessToken,
        refreshToken: refreshToken,
        user: null
    });

const logoutUserFailedAction =
    (message?: string): ILogoutUserFailedAction => ({
        type: LOGOUT_USER_FAILED,
        message: message
    });

const getUserAction =
    (): IGetUserAction => ({
        type: GET_USER_REQUEST
    });

const getUserSuccessAction =
    (user: TUserProfileFormData): IGetUserSuccessAction => ({
        type: GET_USER_SUCCESS,
        user: user
    });

const getUserFailedAction =
    (message?: string): IGetUserFailedAction => ({
        type: GET_USER_FAILED,
        message: message
    });

const patchUserAction =
    (): IPatchUserAction => ({
        type: PATCH_USER_REQUEST
    });

const patchUserSuccessAction =
    (user: TUserProfileFormData, accessToken?: string, refreshToken?: string): IPatchUserSuccessAction => ({
        type: PATCH_USER_SUCCESS,
        user: user,
        accessToken: accessToken,
        refreshToken: refreshToken
    });

const patchUserFailedAction =
    (message?: string): IPatchUserFailedAction => ({
        type: PATCH_USER_FAILED,
        message: message
    });

const forgotPasswordAction =
    (): IForgotPasswordAction => ({
        type: FORGOT_PASSWORD_REQUEST
    });

const forgotPasswordSuccessAction =
    (email: string): IForgotPasswordSuccessAction => ({
        type: FORGOT_PASSWORD_SUCCESS,
        email: email
    });

const forgotPasswordFailedAction =
    (message?: string): IForgotPasswordFailedAction => ({
        type: FORGOT_PASSWORD_FAILED,
        message: message
    });

const resetPasswordAction =
    (): IResetPasswordAction => ({
        type: RESET_PASSWORD_REQUEST
    });

const resetPasswordSuccessAction =
    (message?: string): IResetPasswordSuccessAction => ({
        type: RESET_PASSWORD_SUCCESS,
        message: message
    });

const resetPasswordFailedAction =
    (message?: string): IResetPasswordFailedAction => ({
        type: RESET_PASSWORD_FAILED,
        message: message
    });


export const login = (formData: TLoginFormData): AppThunkAction => (dispatch: AppDispatch) => {
    dispatch(loginUserAction());
    loginRequest(formData)
        .then(res => dispatch(loginUserSuccessAction(res.user, res.accessToken, res.refreshToken)))
        .catch(e => dispatch({ type: LOGIN_USER_FAILED, message: e.message }));
}

export const logout = (refreshToken: string): AppThunkAction => (dispatch: AppDispatch) => {
    dispatch(logoutUserAction());
    logoutRequest(refreshToken)
        .then(res => dispatch(logoutUserSuccessAction(res.accessToken, res.refreshToken)))
        .catch(e => dispatch(logoutUserFailedAction(e.message)));
}

export const forgotPassword = (formData: TForgotPasswordFormData): AppThunkAction => (dispatch: AppDispatch) => {
    dispatch(forgotPasswordAction());
    forgotPasswordRequest(formData)
        .then(() => dispatch(forgotPasswordSuccessAction(formData.email)))
        .catch(e => dispatch(forgotPasswordFailedAction(e.message)));
}


export const resetPassword = (formData: TResetPasswordFormData): AppThunkAction => (dispatch: AppDispatch) => {
    dispatch(resetPasswordAction());
    resetPasswordRequest(formData)
        .then(res => dispatch(resetPasswordSuccessAction(res.message)))
        .catch(e => dispatch(resetPasswordFailedAction(e.message)));
}

export const refreshForgotingPassword
    = (): IRefreshForgotingPasswordAction => ({
        type: REFRESH_FORGOTING_PASSWORD
        , forgotPasswordRequest: false
        , forgotPasswordFailed: false
        , email: null
        , message: null
    });

export const getUser = (token: string, refreshToken: string): AppThunkAction => (dispatch: AppDispatch) => {
    dispatch(getUserAction());
    if (!token) {
        dispatch(getUserFailedAction('Unable to get UserProfile. Empty access token.'));
        return;
    }
    getUserRequest(token, refreshToken)
        .then(res => dispatch(getUserSuccessAction(res.user)))
        .catch(e => dispatch(getUserFailedAction(e.message)));
}

export const patchUser = (accessToken: string, formData: TUserProfileFormData, refreshToken: string): AppThunkAction => (dispatch: AppDispatch) => {
    dispatch(patchUserAction());
    patchUserRequest(accessToken, formData, refreshToken)
        .then(res => dispatch(patchUserSuccessAction(res.user, res.accessToken, res.refreshToken)))
        .catch(e => dispatch(patchUserFailedAction(e.message)));
}