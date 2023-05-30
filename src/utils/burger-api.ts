import { checkResponse } from '../shared/utils/check-response';
import { TResponseBody, NORMA_API } from './api';
import { TBurgerIngredientsItemDto } from '../shared/dtos/burger-ingredients-item-dto';

export const getIngredientsRequest =
    async (): Promise<TResponseBody<"data", Array<TBurgerIngredientsItemDto>>> =>
        await fetch(`${NORMA_API}/ingredients`)
            .then(checkResponse);