import { checkResponse } from '../shared/utils/check-response';
import { setCookie, getCookie } from '../shared/utils/cookie';
import { CustomResponse } from './api';

const NORMA_API = "https://norma.nomoreparties.space/api";

export const registerRequest = async formData => {
    return await fetch(`${NORMA_API}/auth/register`, {
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
    }).then(checkResponse);
}

export const loginRequest = async formData => {
    return await fetch(`${NORMA_API}/auth/login`, {
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
    }).then(checkResponse);
}

export const logoutRequest = async refreshToken => {
    return await fetch(`${NORMA_API}/auth/logout`, {
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
    }).then(checkResponse);
}

export const getUserRequest = async (token, refreshToken) =>
    await fetchWithRefresh(`${NORMA_API}/auth/user`, {
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

export const patchUserRequest = async (token, formData, refreshToken) =>
    await fetchWithRefresh(`${NORMA_API}/auth/user`, {
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

export const forgotPasswordRequest = async (formData) =>
    await fetch(`${NORMA_API}/password-reset`, {
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
    }).then(checkResponse);

export const resetPasswordRequest = async (formData) =>
    await fetch(`${NORMA_API}/password-reset/reset`, {
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
    }).then(checkResponse);

export const refreshTokenRequest = async (refreshToken) =>
    await fetch(`${NORMA_API}/auth/token`, {
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
    }).then(checkResponse);

export const fetchWithRefresh = async (url, options, refreshToken) => {
    try {
        const res = await fetch(url, options);
        return await checkResponse(res);
    }
    catch (err) {
        if (err.message === 'jwt expired') {
            const refreshData = await refreshTokenRequest(refreshToken || getCookie('refreshToken'));
            if (!refreshData.success) {
                Promise.reject(refreshData);
            }
            setCookie('token', refreshData.accessToken, { expires: 1200, path: '/' });
            setCookie('refreshToken', refreshData.refreshToken, { expires: 2400, path: '/' });
            options.headers.Authorization = refreshData.accessToken;
            const res = await fetch(url, options);
            return await checkResponse(res);
        } else {
            return Promise.reject(err);
        }            
    }
}

