import { fetchWithRefresh } from './auth-api';
import { TResponseBody, NORMA_API } from './api';
import { TBurgerOrderItemDto } from '../shared/dtos/burger-order-item-dto';

export const makeOrderRequest =
    async (idIngredients: Array<string>
        , token: string
        , refreshToken: string): Promise<TResponseBody<"order", TBurgerOrderItemDto>> =>
        fetchWithRefresh(`${NORMA_API}/orders`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: token
            },
            body: JSON.stringify({ ingredients: idIngredients })
        }, refreshToken);