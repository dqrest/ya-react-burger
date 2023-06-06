import { TBurgerIngredientsItemDto } from '../../shared/dtos/burger-ingredients-item-dto';

import { SET_INGREDIENT_DETAILS, DELETE_INGREDIENT_DETAILS} from '../action-types/ingredient-details';

export const setIngredientDetails = (ingredientItem?: TBurgerIngredientsItemDto | null) => (
    {
        type: SET_INGREDIENT_DETAILS
        , item: ingredientItem
    }
);

export const deleteIngredientDetails = () => (
    { type: DELETE_INGREDIENT_DETAILS }
);
