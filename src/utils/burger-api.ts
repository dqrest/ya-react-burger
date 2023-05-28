import { checkResponse } from '../shared/utils/check-response';
import { TResponseBody } from './api';
import { TBurgerIngredientsItemDto } from '../shared/dtos/burger-ingredients-item-dto';

const NORMA_API = "https://norma.nomoreparties.space/api";

export const getIngredientsRequest =
    async (): Promise<TResponseBody<"data", Array<TBurgerIngredientsItemDto>>> =>
        await fetch(`${NORMA_API}/ingredients`)
            .then(checkResponse);