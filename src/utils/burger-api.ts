import {  request } from '../shared/utils/check-response';
import { TResponseBody } from './api';
import { TBurgerIngredientsItemDto } from '../shared/dtos/burger-ingredients-item-dto';

export const getIngredientsRequest =
    async (): Promise<TResponseBody<"data", Array<TBurgerIngredientsItemDto>>> =>
        await request('/ingredients', {});