import { checkResponse } from '../shared/utils/check-response';

const NORMA_API = "https://norma.nomoreparties.space/api";

export function getIngredientsRequest() {
    return fetch(`${NORMA_API}/ingredients`)
        .then(checkResponse)
}