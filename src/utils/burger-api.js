import { checkResponse } from '../shared/utils/check-response';

const NORMA_API = "https://norma.nomoreparties.space/api";

export function getIngredientsRequest(): Promise<any> {
    return fetch(`${NORMA_API}/ingredients`)
        .then(checkResponse)
}