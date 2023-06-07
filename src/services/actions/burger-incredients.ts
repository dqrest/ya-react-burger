import { TBurgerIngredientsItemDto } from '../../shared/dtos/burger-ingredients-item-dto';
import { TIngredient } from '../../shared/types/ingredient-type';

import { getIngredientsRequest } from '../../utils/burger-api';

import {
    GET_INGREDIENTS_REQUEST
    , GET_INGREDIENTS_FAILED
    , GET_INGREDIENTS_SUCCESS
    , INCREASE_INGREDIENT_COUNT
    , DECREASE_INGREDIENT_COUNT
    , RESET_INGREDIENTS_COUNT_BY_TYPE
    , RESET_ALL_INGREDIENTS_COUNT
} from '../action-types/burger-incredients';

import {
    IGetIngredientsAction
    , IGetIngredientsFailedAction
    , IGetIngredientsSuccessAction
    , IResetAllIngredientsCountAction
    , IResetIngredientsCountByTypeAction
    , IIncreaseIngredientCountAction
    , IDecreaseIngredientCountAction
} from '../types/burger-incredients';

const getIngredientsAction = (): IGetIngredientsAction => ({
    type: GET_INGREDIENTS_REQUEST
});
const getIngredientsSuccessAction = (items: Array<TBurgerIngredientsItemDto>): IGetIngredientsSuccessAction => ({
    type: GET_INGREDIENTS_SUCCESS
    , items: items
});
const getIngredientsFailedAction = (): IGetIngredientsFailedAction => ({
    type: GET_INGREDIENTS_FAILED
});

export function getIngredients(): any {
    return function (dispatch: any) {
        dispatch(getIngredientsAction());
        getIngredientsRequest()
            .then(res => {
                if (res && res.success) {
                    dispatch(getIngredientsSuccessAction(res.data));
                    return;
                }
                dispatch(getIngredientsFailedAction());
            })
            .catch(() => dispatch(getIngredientsFailedAction()));
    };
}

export const increaseIngredientCount =
    (id: string): IIncreaseIngredientCountAction => (
        { type: INCREASE_INGREDIENT_COUNT, id: id }
    );

export const decreaseIngredientCount =
    (id: string): IDecreaseIngredientCountAction => (
        { type: DECREASE_INGREDIENT_COUNT, id: id }
    );

export const resetIngredientsCountByType =
    (typeIngredient: TIngredient): IResetIngredientsCountByTypeAction => (
        { type: RESET_INGREDIENTS_COUNT_BY_TYPE, typeIngredient: typeIngredient }
    );

export const resetAllIngredientsCount =
    (): IResetAllIngredientsCountAction => ({
        type: RESET_ALL_INGREDIENTS_COUNT
    });


