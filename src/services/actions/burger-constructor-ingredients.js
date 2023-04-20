export const GET_CONSTRUCTOR_INGREDIENTS = 'GET_CONSTRUCTOR_INGREDIENTS';

export function getConstructorIngredients() {
    return function (dispatch) {
        dispatch({ type: GET_CONSTRUCTOR_INGREDIENTS });        
    };
}