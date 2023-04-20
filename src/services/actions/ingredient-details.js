export const SET_INGREDIENT_DETAILS = "SET_INGREDIENT_DETAILS";
export const DELETE_INGREDIENT_DETAILS = "DELETE_INGREDIENT_DETAILS";


export function setIngredientDetails(ingredientItem){
    return function(dispatch){
        dispatch({ 
            type: SET_INGREDIENT_DETAILS
            , item: ingredientItem
        });
    }
}

export function deleteIngredientDetails(){
    return function(dispatch){
        dispatch({type: DELETE_INGREDIENT_DETAILS});
    }
}