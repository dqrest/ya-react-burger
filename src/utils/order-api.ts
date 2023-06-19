import { fetchWithRefresh } from './auth-api';
import { TResponseBody } from './api';
import { TBurgerOrderItemDto } from '../shared/dtos/burger-order-item-dto';


export const makeOrderRequest =
    async (idIngredients: Array<string>
        , token: string
        , refreshToken: string): Promise<TResponseBody<"order", TBurgerOrderItemDto>> =>
        await fetchWithRefresh('/orders', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: token
            },
            body: JSON.stringify({ ingredients: idIngredients })
        }, refreshToken);