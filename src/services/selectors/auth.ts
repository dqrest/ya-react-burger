import type { RootState } from '../types';
import {
    TForgotPasswordState
    , TRegisterState
    , TAuthState
    , TResetPasswordState
} from '../reducers/auth';

export const getForgottenPassword = (store: RootState): TForgotPasswordState => store.forgotPassword;
export const getRegisteredUser = (store: RootState): TRegisterState => store.register; // from useUser
export const getAuthUser = (store: RootState): TAuthState => store.auth;
export const getResetPassword = (store: RootState): TResetPasswordState => store.resetPassword;
