import {
    REGISTER_USER_REQUEST
    , REGISTER_USER_SUCCESS
    , REGISTER_USER_FAILED
    , REFRESH_REGISTERING
    , LOGIN_USER_REQUEST
    , LOGIN_USER_SUCCESS
    , LOGIN_USER_FAILED
    , LOGOUT_USER_REQUEST
    , LOGOUT_USER_SUCCESS
    , LOGOUT_USER_FAILED
    , GET_USER_REQUEST
    , GET_USER_SUCCESS
    , GET_USER_FAILED
    , PATCH_USER_REQUEST
    , PATCH_USER_SUCCESS
    , PATCH_USER_FAILED
    , FORGOT_PASSWORD_REQUEST
    , FORGOT_PASSWORD_SUCCESS
    , FORGOT_PASSWORD_FAILED
    , REFRESH_FORGOTING_PASSWORD
    , RESET_PASSWORD_REQUEST
    , RESET_PASSWORD_SUCCESS
    , RESET_PASSWORD_FAILED
} from '../action-types/auth';

import {
    TLoginFormData
    , TUserProfileFormData
    , TLoginFormDataResponse
    , TForgotPasswordFormData
    , TResetPasswordFormData
} from '../../shared/types/auth-types';

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

export interface IRefreshRegistering {
    readonly type: typeof REFRESH_REGISTERING;
    readonly registerRequest: boolean;
    readonly registerFailed: boolean;
}

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

export type TRegisterReducerAction =
    IRegisterUserAction
    | IRegisterUserFailedAction
    | IRegisterUserSuccessAction
    | IRefreshRegistering;

export type TAuthReducerAction =
    ILoginUserAction
    | ILoginUserFailedAction
    | ILoginUserSuccessAction
    | ILogoutUserAction
    | ILogoutUserFailedAction
    | ILogoutUserSuccessAction
    | IGetUserSuccessAction
    | IGetUserAction
    | IGetUserFailedAction
    | IPatchUserAction
    | IPatchUserFailedAction
    | IPatchUserSuccessAction;

export type TForgotPasswordReducerAction =
    IForgotPasswordAction
    | IForgotPasswordFailedAction
    | IForgotPasswordSuccessAction
    | IRefreshForgotingPasswordAction;

export type TResetPasswordReducerAction =
    IResetPasswordAction
    | IResetPasswordFailedAction
    | IResetPasswordSuccessAction;


