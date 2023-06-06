import { TBurgerIngredientsItemDto } from '../../shared/dtos/burger-ingredients-item-dto';

export const SET_INGREDIENT_DETAILS = "SET_INGREDIENT_DETAILS";
export const DELETE_INGREDIENT_DETAILS = "DELETE_INGREDIENT_DETAILS";

export const setIngredientDetails = (ingredientItem?: TBurgerIngredientsItemDto | null) => (
    {
        type: SET_INGREDIENT_DETAILS
        , item: ingredientItem
    }
);

export const deleteIngredientDetails = () => (
    { type: DELETE_INGREDIENT_DETAILS }
);
