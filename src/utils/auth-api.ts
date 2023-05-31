import { request } from '../shared/utils/check-response';
import { setCookie, getCookie } from '../shared/utils/cookie';
import { TResponseBody } from './api';

// shared
import {
    TLoginFormData
    , TLoginFormDataResponse
    , TUserProfileFormData
    , TForgotPasswordFormData
    , TResetPasswordFormData
} from '../shared/types/auth-types';


export const registerRequest =
    async (formData: TUserProfileFormData): Promise<TResponseBody<"user", TUserProfileFormData>> =>
        await request("/auth/register", {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(formData)
        });

export const loginRequest =
    async (formData: TLoginFormData): Promise<TResponseBody<"user", TLoginFormDataResponse>> =>
        await request('/auth/login', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(formData)
        });

export const logoutRequest =
    async (refreshToken: string): Promise<TResponseBody<"logout", undefined>> =>
        await request('/auth/logout', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({ token: refreshToken })
        });

export const getUserRequest =
    async (token: string, refreshToken: string): Promise<TResponseBody<"user", TUserProfileFormData>> =>
        await fetchWithRefresh('/auth/user', {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer'
        }, refreshToken);

export const patchUserRequest =
    async (token: string, formData: TUserProfileFormData, refreshToken: string): Promise<TResponseBody<"user", TUserProfileFormData>> =>
        await fetchWithRefresh('/auth/user', {
            method: 'PATCH',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(formData)
        }, refreshToken);

export const forgotPasswordRequest =
    async (formData: TForgotPasswordFormData): Promise<TResponseBody<"forgotPassword", TForgotPasswordFormData>> =>
        await request('/password-reset', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(formData)
        });

export const resetPasswordRequest =
    async (formData: TResetPasswordFormData): Promise<TResponseBody<"resetPassword", undefined>> =>
        await request('/password-reset/reset', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(formData)
        });

export const refreshTokenRequest = async (refreshToken: string): Promise<TResponseBody<"refreshToken", undefined>> =>
    await request('auth/token', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({ token: refreshToken })
    });

export const fetchWithRefresh = async <TK extends string = '', TD = {}>(url: string, options: any, refreshToken: string) => {
    try {
        return await request<TK, TD>(url, options);
    }
    catch (err: any) {
        if (err.message === 'jwt expired') {
            const refreshData = await refreshTokenRequest(refreshToken || getCookie('refreshToken') || '');
            if (!refreshData?.accessToken || !refreshData?.refreshToken)
                return Promise.reject(refreshData);

            setCookie('token', refreshData.accessToken, { expires: 1200, path: '/' });
            setCookie('refreshToken', refreshData.refreshToken, { expires: 2400, path: '/' });
            options.headers.Authorization = refreshData.accessToken;
            return await request<TK, TD>(url, options);
        } else {
            return Promise.reject(err);
        }
    }
}

