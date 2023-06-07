import { TBurgerIngredientsItemDto } from '../../shared/dtos/burger-ingredients-item-dto';

import { SET_INGREDIENT_DETAILS, DELETE_INGREDIENT_DETAILS} from '../action-types/ingredient-details';
import {ISetIngredientDetailsAction, IDeleteIngredientDetailsAction} from '../types/ingredient-details';

export const setIngredientDetails = (ingredientItem?: TBurgerIngredientsItemDto | null): ISetIngredientDetailsAction => (
    {
        type: SET_INGREDIENT_DETAILS
        , item: ingredientItem
    }
);

export const deleteIngredientDetails = (): IDeleteIngredientDetailsAction => (
    { type: DELETE_INGREDIENT_DETAILS }
);
