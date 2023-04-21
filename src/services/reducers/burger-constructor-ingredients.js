import {
    GET_CONSTRUCTOR_INGREDIENTS
    , ADD_CONSTRUCTOR_INGREDIENT
    , DELETE_CONSTRUCTOR_INGREDIENTS_BY_TYPE
}
from '../actions/burger-constructor-ingredients';

const initialState = {
    items: []
};

export const constructorIngredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CONSTRUCTOR_INGREDIENTS:
            return { ...state };
        case ADD_CONSTRUCTOR_INGREDIENT:            
            if (!action?.item) return state;
            let newItems = [...(state.items || []), action.item]
            return { ...state, items: newItems };
        case DELETE_CONSTRUCTOR_INGREDIENTS_BY_TYPE:
            debugger;
            let notDel = (state?.items || []).filter(ing => ing?.type !== action?.ingredientType) || [];
            return { ...state, items: notDel};
        default:
            return state;
    }
}