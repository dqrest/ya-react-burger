export const GET_CONSTRUCTOR_INGREDIENTS = 'GET_CONSTRUCTOR_INGREDIENTS';

export const ADD_CONSTRUCTOR_INGREDIENT = 'ADD_CONSTRUCTOR_INGREDIENT';
export const DELETE_CONSTRUCTOR_INGREDIENT = 'DELETE_CONSTRUCTOR_INGREDIENT';
export const DELETE_ALL_CONSTRUCTOR_INGREDIENTS = 'DELETE_ALL_CONSTRUCTOR_INGREDIENTS';

export const CHANGE_ORDER_CONSTRUCTOR_INGREDIENTS = 'CHANGE_ORDER_CONSTRUCTOR_INGREDIENTS';

export const SET_BUN_TO_CONSTRUCTOR = 'SET_BUN_TO_CONSTRUCTOR';

export const getConstructorIngredients = () => (
    { type: GET_CONSTRUCTOR_INGREDIENTS }
);

export const addConstructorIngredient = (ingredient) => (
    { type: ADD_CONSTRUCTOR_INGREDIENT, item: ingredient }
);

export const deleteConstructorIngredient = (deleteIndex) => (
    { type: DELETE_CONSTRUCTOR_INGREDIENT, deleteIndex: deleteIndex }
);

export const deleteAllConstructorIngredients = () => (
    { type: DELETE_ALL_CONSTRUCTOR_INGREDIENTS }
);

export const changeOrderConstructorIngredients = (sourceIndex, targetIndex) => (
    {
        type: CHANGE_ORDER_CONSTRUCTOR_INGREDIENTS
        , sourceIndex: sourceIndex
        , targetIndex: targetIndex
    }
);

export const setBunToConstructor = (bun) => (
    {
        type: SET_BUN_TO_CONSTRUCTOR
        , bun: bun
    }
);
