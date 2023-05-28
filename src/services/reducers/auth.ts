import { TUserProfileFormData } from '../../shared/types/auth-types';
import {
    REGISTER_USER_FAILED
    , REGISTER_USER_REQUEST
    , REGISTER_USER_SUCCESS
    , REFRESH_REGISTERING

    , LOGIN_USER_FAILED
    , LOGIN_USER_SUCCESS
    , LOGIN_USER_REQUEST
    , REFRESH_LOGINING

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

    , REFRESH_TOKEN_REQUEST
    , REFRESH_TOKEN_SUCCESS
    , REFRESH_TOKEN_FAILED

    , PATCH_USER_REQUEST
    , PATCH_USER_SUCCESS
    , PATCH_USER_FAILED

    , ILoginUserAction
    , ILoginUserFailedAction
    , ILoginUserSuccessAction
    , ILogoutUserAction
    , ILogoutUserFailedAction
    , ILogoutUserSuccessAction
    , IGetUserAction
    , IGetUserFailedAction
    , IGetUserSuccessAction
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
    , IRegisterUserAction
    , IRegisterUserFailedAction
    , IRegisterUserSuccessAction
    , IRefreshRegistering
} from '../actions/auth';

type TAuthReducerAction =
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

export type TAuthState = {
    user: any;
    message?: string | null;
    request: boolean;
    failed: boolean;
    accessToken?: string | null;
    refreshToken?: string | null;
    actionType?: string | null;
};


const authInitialState: TAuthState = {
    user: null
    , message: null
    , request: false
    , failed: false
    , accessToken: null
    , refreshToken: null
    , actionType: null
};

export const authReducer = (state = authInitialState, action: TAuthReducerAction) => {
    state = { ...state, actionType: action.type };
    switch (action.type) {
        case LOGIN_USER_REQUEST: {
            return { ...state, request: true };
        }
        case LOGIN_USER_SUCCESS: {
            return {
                ...state
                , request: false
                , failed: false
                , user: action.user
                , accessToken: action.accessToken
                , refreshToken: action.refreshToken
            };
        }
        case LOGIN_USER_FAILED: {
            return {
                ...state
                , request: false
                , failed: true
                , message: action.message
                , user: null
            };
        }
        case LOGOUT_USER_REQUEST: {
            return { ...state, request: true };
        }
        case LOGOUT_USER_SUCCESS: {
            return {
                ...state
                , request: false
                , failed: false
                , user: action.user
                , accessToken: action.accessToken
                , refreshToken: action.refreshToken
            };
        }
        case LOGOUT_USER_FAILED: {
            return {
                ...state
                , request: false
                , failed: true
                , message: action.message
            };
        }
        case GET_USER_REQUEST:
        case PATCH_USER_REQUEST: {
            return { ...state, request: true };
        }
        case GET_USER_SUCCESS:
        case PATCH_USER_SUCCESS: {
            return {
                ...state
                , request: false
                , failed: false
                , user: action.user
            };
        }
        case GET_USER_FAILED:
        case PATCH_USER_FAILED: {
            return {
                ...state
                , request: false
                , failed: true
                , message: action.message
            };
        }
        //        case REFRESH_TOKEN_REQUEST: {
        //            return { ...state, request: true };
        //        }
        //        case REFRESH_TOKEN_SUCCESS: {
        //            return {
        //                ...state
        //                , request: false
        //                , failed: false
        //                , refreshToken: action.refreshToken
        //                , accessToken: action.accessToken
        //            };
        //        }
        //        case REFRESH_TOKEN_FAILED: {
        //            return {
        //                ...state
        //                , request: false
        //                , failed: true
        //                , message: action.message
        //            };
        //        }
        default:
            return state;
    }
}

export type TRegisterState = {
    user?: TUserProfileFormData | null;
    message?: null | null;
    registerRequest: boolean;
    registerFailed: boolean;
}

const registerInitialState: TRegisterState = {
    user: null
    , message: null
    , registerRequest: false
    , registerFailed: false
};
type TRegisterReducerAction =
    IRegisterUserAction
    | IRegisterUserFailedAction
    | IRegisterUserSuccessAction
    | IRefreshRegistering;

export const registerReducer = (state = registerInitialState, action: TRegisterReducerAction) => {
    switch (action.type) {
        case REGISTER_USER_REQUEST: {
            return { ...state, registerRequest: true };
        }
        case REGISTER_USER_SUCCESS: {
            return { ...state, registerRequest: false, registerFailed: false, user: action.user };
        }
        case REGISTER_USER_FAILED: {
            return { ...state, registerRequest: false, registerFailed: true, message: action.message };
        }
        case REFRESH_REGISTERING: {
            return { ...state, registerRequest: action.registerRequest, registerFailed: action.registerFailed };
        }
        default:
            return state;
    }
}

export type TForgotPasswordState = {
    email?: string | null;
    message?: string | null;
    forgotPasswordRequest: boolean;
    forgotPasswordFailed: boolean;
};

const forgotPasswordInitialState: TForgotPasswordState = {
    email: null
    , message: null
    , forgotPasswordRequest: false
    , forgotPasswordFailed: false
};

type TForgotPasswordReducerAction =
    IForgotPasswordAction
    | IForgotPasswordFailedAction
    | IForgotPasswordSuccessAction
    | IRefreshForgotingPasswordAction;

export const forgotPasswordReducer = (state = forgotPasswordInitialState, action: TForgotPasswordReducerAction) => {
    switch (action.type) {
        case FORGOT_PASSWORD_REQUEST: {
            return { ...state, forgotPasswordRequest: true };
        }
        case FORGOT_PASSWORD_SUCCESS: {
            return { ...state, forgotPasswordRequest: false, forgotPasswordFailed: false, email: action.email };
        }
        case FORGOT_PASSWORD_FAILED: {
            return { ...state, forgotPasswordRequest: false, forgotPasswordFailed: true, message: action.message };
        }
        case REFRESH_FORGOTING_PASSWORD: {
            return { ...state, forgotPasswordRequest: action.forgotPasswordRequest, forgotPasswordFailed: action.forgotPasswordFailed };
        }
        default:
            return state;
    }
}

export type TResetPasswordState = {
    message?: string | null;
    resetPasswordRequest: boolean;
    resetPasswordFailed: boolean;
};

const resetPasswordInitialState: TResetPasswordState = {
    message: null
    , resetPasswordRequest: false
    , resetPasswordFailed: false
};

type TResetPasswordReducerAction =
    IResetPasswordAction
    | IResetPasswordFailedAction
    | IResetPasswordSuccessAction;

export const resetPasswordReducer = (state = resetPasswordInitialState, action: TResetPasswordReducerAction) => {
    //    state = {...state, actionType: action.type};
    switch (action.type) {
        case RESET_PASSWORD_REQUEST: {
            return { ...state, resetPasswordRequest: true };
        }
        case RESET_PASSWORD_SUCCESS: {
            return { ...state, resetPasswordRequest: false, resetPasswordFailed: false, message: action.message };
        }
        case RESET_PASSWORD_FAILED: {
            return { ...state, resetPasswordRequest: false, resetPasswordFailed: true, message: action.message };
        }
        default:
            return state;
    }
}