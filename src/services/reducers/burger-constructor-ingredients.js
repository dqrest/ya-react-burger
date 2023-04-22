import {
    GET_CONSTRUCTOR_INGREDIENTS
    , ADD_CONSTRUCTOR_INGREDIENT
    , DELETE_CONSTRUCTOR_INGREDIENTS_BY_TYPE
    , DELETE_CONSTRUCTOR_INGREDIENT
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
            const newItems = [...(state.items || []), action.item]
            return { ...state, items: newItems };
        case DELETE_CONSTRUCTOR_INGREDIENTS_BY_TYPE:
            const notDeleteItems = (state?.items || []).filter(ing => ing?.type !== action?.ingredientType) || [];
            return { ...state, items: notDeleteItems };
        case DELETE_CONSTRUCTOR_INGREDIENT:            
            if (state?.items && action?.deleteIndex >= 0 && action?.deleteIndex < state?.items?.length) {
                const items = state.items.filter((item, ind) => ind !== action.deleteIndex);
                return { ...state, items: items };
            }
            return state;
        default:
            return state;
    }
}