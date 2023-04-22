export const GET_CONSTRUCTOR_INGREDIENTS = 'GET_CONSTRUCTOR_INGREDIENTS';

export const ADD_CONSTRUCTOR_INGREDIENT = 'ADD_CONSTRUCTOR_INGREDIENT';

export const DELETE_CONSTRUCTOR_INGREDIENT = 'DELETE_CONSTRUCTOR_INGREDIENT';
export const DELETE_CONSTRUCTOR_INGREDIENTS_BY_TYPE = 'DELETE_CONSTRUCTOR_INGREDIENTS_BY_TYPE';

export function getConstructorIngredients() {
    return function (dispatch) {
        dispatch({ type: GET_CONSTRUCTOR_INGREDIENTS });        
    };
}

export function addConstructorIngredient(ingredient) {
    return function (dispatch) {        
        dispatch({ type: ADD_CONSTRUCTOR_INGREDIENT, item: ingredient });
    }
}

export function deleteConstructorIngredientsByType(ingredientType) {
    return function (dispatch) {
        dispatch({ type: DELETE_CONSTRUCTOR_INGREDIENTS_BY_TYPE, ingredientType: ingredientType });
    }
}

export function deleteConstructorIngredient(deleteIndex) {
    return function (dispatch) {
        dispatch({ type: DELETE_CONSTRUCTOR_INGREDIENT, deleteIndex: deleteIndex });
    }
}