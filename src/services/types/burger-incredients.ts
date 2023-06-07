import { TBurgerIngredientsItemDto } from '../../shared/dtos/burger-ingredients-item-dto';
import { TIngredient } from '../../shared/types/ingredient-type';

import {
    GET_INGREDIENTS_REQUEST
    , GET_INGREDIENTS_FAILED
    , GET_INGREDIENTS_SUCCESS
    , INCREASE_INGREDIENT_COUNT
    , DECREASE_INGREDIENT_COUNT
    , RESET_INGREDIENTS_COUNT_BY_TYPE
    , RESET_ALL_INGREDIENTS_COUNT
} from '../action-types/burger-incredients';

export interface IGetIngredientsAction {
    readonly type: typeof GET_INGREDIENTS_REQUEST;
}
export interface IGetIngredientsFailedAction {
    readonly type: typeof GET_INGREDIENTS_FAILED;
}
export interface IGetIngredientsSuccessAction {
    readonly type: typeof GET_INGREDIENTS_SUCCESS;
    readonly items: Array<TBurgerIngredientsItemDto>;
}

export interface IResetAllIngredientsCountAction {
    readonly type: typeof RESET_ALL_INGREDIENTS_COUNT;
}

export interface IResetIngredientsCountByTypeAction {
    readonly type: typeof RESET_INGREDIENTS_COUNT_BY_TYPE;
    readonly typeIngredient: TIngredient;
}

export interface IIncreaseIngredientCountAction {
    readonly type: typeof INCREASE_INGREDIENT_COUNT;
    readonly id: string;
}

export interface IDecreaseIngredientCountAction {
    readonly type: typeof DECREASE_INGREDIENT_COUNT;
    readonly id: string;
}

export type TIngredientsReducerAction = IGetIngredientsAction
    | IGetIngredientsFailedAction
    | IGetIngredientsSuccessAction
    | IResetAllIngredientsCountAction
    | IResetIngredientsCountByTypeAction
    | IIncreaseIngredientCountAction
    | IDecreaseIngredientCountAction;