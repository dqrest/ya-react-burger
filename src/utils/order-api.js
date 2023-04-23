import { checkResponse } from '../shared/utils/check-response';

const NORMA_API = "https://norma.nomoreparties.space/api";


export function makeOrderRequest(idIngredients) {    
    idIngredients = idIngredients || [];
    return fetch(`${NORMA_API}/orders`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ingredients: idIngredients})
    }).then(checkResponse)
}