import {
    registerRequest
    , loginRequest
    , logoutRequest
    , forgotPasswordRequest
    , resetPasswordRequest
    , getUserRequest
    , patchUserRequest
} from '../../utils/auth-api';

// shared
import {
    TLoginFormData
    , TUserProfileFormData
    , TLoginFormDataResponse
    , TForgotPasswordFormData
    , TResetPasswordFormData
} from '../../shared/types/auth-types';

export const SET_USER: 'SET_USER' = 'SET_USER';

export const REGISTER_USER_REQUEST: 'REGISTER_USER_REQUEST' = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS: 'REGISTER_USER_SUCCESS' = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILED: 'REGISTER_USER_FAILED' = 'REGISTER_USER_FAILED';

export const REFRESH_REGISTERING: 'REFRESH_REGISTERING' = 'REFRESH_REGISTERING';

export const LOGIN_USER_REQUEST: 'LOGIN_USER_REQUEST' = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS: 'LOGIN_USER_SUCCESS' = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILED: 'LOGIN_USER_FAILED' = 'LOGIN_USER_FAILED';

export const LOGOUT_USER_REQUEST: 'LOGOUT_USER_REQUEST' = 'LOGOUT_USER_REQUEST';
export const LOGOUT_USER_SUCCESS: 'LOGOUT_USER_SUCCESS' = 'LOGOUT_USER_SUCCESS';
export const LOGOUT_USER_FAILED: 'LOGOUT_USER_FAILED' = 'LOGOUT_USER_FAILED';

export const REFRESH_LOGINING: 'REFRESH_LOGINING' = 'REFRESH_LOGINING';

export const FORGOT_PASSWORD_REQUEST: 'FORGOT_PASSWORD_REQUEST' = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS: 'FORGOT_PASSWORD_SUCCESS' = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED: 'FORGOT_PASSWORD_FAILED' = 'FORGOT_PASSWORD_FAILED';

export const REFRESH_FORGOTING_PASSWORD: 'REFRESH_FORGOTING_PASSWORD' = 'REFRESH_FORGOTING_PASSWORD';

export const RESET_PASSWORD_REQUEST: 'RESET_PASSWORD_REQUEST' = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD_SUCCESS' = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED: 'RESET_PASSWORD_FAILED' = 'RESET_PASSWORD_FAILED';

export const GET_USER_REQUEST: 'GET_USER_REQUEST' = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS: 'GET_USER_SUCCESS' = 'GET_USER_SUCCESS';
export const GET_USER_FAILED: 'GET_USER_FAILED' = 'GET_USER_FAILED';

export const PATCH_USER_REQUEST: 'PATCH_USER_REQUEST' = 'PATCH_USER_REQUEST';
export const PATCH_USER_SUCCESS: 'PATCH_USER_SUCCESS' = 'PATCH_USER_SUCCESS';
export const PATCH_USER_FAILED: 'PATCH_USER_FAILED' = 'PATCH_USER_FAILED';

export const REFRESH_TOKEN_REQUEST: 'REFRESH_TOKEN_REQUEST' = 'REFRESH_TOKEN_REQUEST';
export const REFRESH_TOKEN_SUCCESS: 'REFRESH_TOKEN_SUCCESS' = 'REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_FAILED: 'REFRESH_TOKEN_FAILED' = 'REFRESH_TOKEN_FAILED';

export interface IRegisterUserAction {
    readonly type: typeof REGISTER_USER_REQUEST;
};
export interface IRegisterUserSuccessAction {
    readonly type: typeof REGISTER_USER_SUCCESS;
    readonly user: TUserProfileFormData;
};
export interface IRegisterUserFailedAction {
    readonly type: typeof REGISTER_USER_FAILED;
    readonly message?: string;
};

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

export interface IRefreshRegistering {
    readonly type: typeof REFRESH_REGISTERING;
    readonly registerRequest: boolean;
    readonly registerFailed: boolean;
}

export function register(formData: TUserProfileFormData): any {
    return function (dispatch: any) {
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
    };
}

export const refreshRegistering = (): IRefreshRegistering => (
    { type: REFRESH_REGISTERING, registerRequest: false, registerFailed: false }
);

//export const setUser = (user) => (
//    { type: SET_USER, user: user }
//);

export interface ILoginUserAction {
    readonly type: typeof LOGIN_USER_REQUEST;
}

export interface ILoginUserSuccessAction {
    readonly type: typeof LOGIN_USER_SUCCESS;
    readonly user: TLoginFormDataResponse;
    readonly refreshToken?: string;
    readonly accessToken?: string;
}

export interface ILoginUserFailedAction {
    readonly type: typeof LOGIN_USER_FAILED;
    readonly message?: string;
}

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

export interface ILogoutUserAction {
    readonly type: typeof LOGOUT_USER_REQUEST;
}
export interface ILogoutUserSuccessAction {
    readonly type: typeof LOGOUT_USER_SUCCESS;
    readonly accessToken?: string;
    readonly refreshToken?: string;
    readonly user?: unknown
}
export interface ILogoutUserFailedAction {
    readonly type: typeof LOGOUT_USER_FAILED;
    readonly message?: string;
}
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

export interface IGetUserAction {
    readonly type: typeof GET_USER_REQUEST;
};
export interface IGetUserSuccessAction {
    readonly type: typeof GET_USER_SUCCESS;
    readonly user: TUserProfileFormData;
};
export interface IGetUserFailedAction {
    readonly type: typeof GET_USER_FAILED;
    readonly message?: string;
};

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

export interface IPatchUserAction {
    readonly type: typeof PATCH_USER_REQUEST;
};
export interface IPatchUserSuccessAction {
    readonly type: typeof PATCH_USER_SUCCESS;
    readonly user: TUserProfileFormData;
    readonly refreshToken?: string;
    readonly accessToken?: string;
};
export interface IPatchUserFailedAction {
    readonly type: typeof PATCH_USER_FAILED;
    readonly message?: string;
};

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

export interface IForgotPasswordAction {
    readonly type: typeof FORGOT_PASSWORD_REQUEST;
};
export interface IForgotPasswordSuccessAction {
    readonly type: typeof FORGOT_PASSWORD_SUCCESS;
    readonly email: string;
};
export interface IForgotPasswordFailedAction {
    readonly type: typeof FORGOT_PASSWORD_FAILED;
    readonly message?: string;
};

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

export interface IRefreshForgotingPasswordAction {
    readonly type: typeof REFRESH_FORGOTING_PASSWORD;
    readonly forgotPasswordRequest: boolean;
    readonly forgotPasswordFailed: boolean;
    readonly email?: unknown;
    readonly message?: unknown;
}

export interface IResetPasswordAction {
    readonly type: typeof RESET_PASSWORD_REQUEST;
};
export interface IResetPasswordSuccessAction {
    readonly type: typeof RESET_PASSWORD_SUCCESS;
    readonly message?: string;
};
export interface IResetPasswordFailedAction {
    readonly type: typeof RESET_PASSWORD_FAILED;
    readonly message?: string;
};

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


export function login(formData: TLoginFormData): any {
    return function (dispatch: any) {
        dispatch(loginUserAction());
        loginRequest(formData)
            .then(res => dispatch(loginUserSuccessAction(res.user, res.accessToken, res.refreshToken)))
            .catch(e => dispatch({ type: LOGIN_USER_FAILED, message: e.message }));
    };
}

export function logout(refreshToken: string): any {
    return function (dispatch: any) {
        dispatch(logoutUserAction());
        logoutRequest(refreshToken)
            .then(res => dispatch(logoutUserSuccessAction(res.accessToken, res.refreshToken)))
            .catch(e => dispatch(logoutUserFailedAction(e.message)));
    };
}

export function forgotPassword(formData: TForgotPasswordFormData): any {
    return function (dispatch: any) {
        dispatch(forgotPasswordAction());
        forgotPasswordRequest(formData)
            .then(() => dispatch(forgotPasswordSuccessAction(formData.email)))
            .catch(e => dispatch(forgotPasswordFailedAction(e.message)));
    };
}


export function resetPassword(formData: TResetPasswordFormData): any {
    return function (dispatch: any) {
        dispatch(resetPasswordAction());
        resetPasswordRequest(formData)
            .then(res => dispatch(resetPasswordSuccessAction(res.message)))
            .catch(e => dispatch(resetPasswordFailedAction(e.message)));
    }
}

export const refreshForgotingPassword
    = (): IRefreshForgotingPasswordAction => ({
        type: REFRESH_FORGOTING_PASSWORD
        , forgotPasswordRequest: false
        , forgotPasswordFailed: false
        , email: null
        , message: null
    });

export function getUser(token: string, refreshToken: string): any {
    return function (dispatch: any) {
        dispatch(getUserAction());
        if (!token) {
            dispatch(getUserFailedAction('Unable to get UserProfile. Empty access token.'));
            return;
        }
        getUserRequest(token, refreshToken)
            .then(res => dispatch(getUserSuccessAction(res.user)))
            .catch(e => dispatch(getUserFailedAction(e.message)));
    };
}

export function patchUser(accessToken: string, formData: TUserProfileFormData, refreshToken: string): any {
    return function (dispatch: any) {
        dispatch(patchUserAction());
        patchUserRequest(accessToken, formData, refreshToken)
            .then(res => dispatch(patchUserSuccessAction(res.user, res.accessToken, res.refreshToken)))
            .catch(e => dispatch(patchUserFailedAction(e.message)));
    };
}