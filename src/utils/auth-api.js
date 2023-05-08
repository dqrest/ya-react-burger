import { checkResponse } from '../shared/utils/check-response';

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

export const getUserRequest = async (cookie) =>
    await fetch(`${NORMA_API}/user`, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${cookie}`
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
    });