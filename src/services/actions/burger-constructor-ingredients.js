export const GET_CONSTRUCTOR_INGREDIENTS = 'GET_CONSTRUCTOR_INGREDIENTS';

export const ADD_CONSTRUCTOR_INGREDIENT = 'ADD_CONSTRUCTOR_INGREDIENT';

export const DELETE_CONSTRUCTOR_INGREDIENT = 'DELETE_CONSTRUCTOR_INGREDIENT';
export const DELETE_CONSTRUCTOR_INGREDIENTS_BY_TYPE = 'DELETE_CONSTRUCTOR_INGREDIENTS_BY_TYPE';

export const CHANGE_ORDER_CONSTRUCTOR_INGREDIENTS = 'CHANGE_ORDER_CONSTRUCTOR_INGREDIENTS';

export const getConstructorIngredients = () => (
    { type: GET_CONSTRUCTOR_INGREDIENTS }
);

export const addConstructorIngredient = (ingredient) => (
    { type: ADD_CONSTRUCTOR_INGREDIENT, item: ingredient }
);

export const deleteConstructorIngredientsByType = (ingredientType) => (
    { type: DELETE_CONSTRUCTOR_INGREDIENTS_BY_TYPE, ingredientType: ingredientType }
);

export const deleteConstructorIngredient = (deleteIndex) => (
    { type: DELETE_CONSTRUCTOR_INGREDIENT, deleteIndex: deleteIndex }
);

export const changeOrderConstructorIngredients = (sourceIndex, targetIndex) => (
    {
        type: CHANGE_ORDER_CONSTRUCTOR_INGREDIENTS
        , sourceIndex: sourceIndex
        , targetIndex: targetIndex
    }
);
