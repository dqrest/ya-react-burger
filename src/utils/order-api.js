import { fetchWithRefresh } from './auth-api';

const NORMA_API = "https://norma.nomoreparties.space/api";

export const makeOrderRequest = async (idIngredients, token, refreshToken) =>
    fetchWithRefresh(`${NORMA_API}/orders`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: token
        },
        body: JSON.stringify({ ingredients: idIngredients })
    }, refreshToken);