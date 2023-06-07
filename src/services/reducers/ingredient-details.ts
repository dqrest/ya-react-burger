import { TBurgerIngredientsItemDto } from '../../shared/dtos/burger-ingredients-item-dto';

import { SET_INGREDIENT_DETAILS, DELETE_INGREDIENT_DETAILS } from '../action-types/ingredient-details';

import { TIngredientDetailsReducerAction } from '../types/ingredient-details';


type TIngredientDetailsState = {
    item?: TBurgerIngredientsItemDto | null;
};

const initialState: TIngredientDetailsState = {
    item: null
};

export const ingredientDetailsReducer = (state = initialState, action: TIngredientDetailsReducerAction) => {
    switch (action.type) {
        case SET_INGREDIENT_DETAILS:
            return { ...state, item: action.item };
        case DELETE_INGREDIENT_DETAILS:
            return { ...state, item: null };
        default:
            return state;
    }
}

