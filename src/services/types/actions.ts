import {
    REGISTER_USER_REQUEST
    , REGISTER_USER_SUCCESS
    , REGISTER_USER_FAILED 
    , REFRESH_REGISTERING
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

export type TRegisterReducerAction =
    IRegisterUserAction
    | IRegisterUserFailedAction
    | IRegisterUserSuccessAction
    | IRefreshRegistering;

