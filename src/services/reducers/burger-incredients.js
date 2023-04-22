import {
    GET_INGREDIENTS_REQUEST
    , GET_INGREDIENTS_FAILED
    , GET_INGREDIENTS_SUCCESS
    , INCREASE_INGREDIENT_COUNT
    , DECREASE_INGREDIENT_COUNT
    , RESET_INGREDIENTS_COUNT_BY_TYPE
} from '../actions/burger-incredients';


const initialState = {
    items: []
    , itemsFailed: false
    , itemsRequest: false
};

export const ingredientsReducer = (state = initialState, action) => {    
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST:
            return { ...state, itemsRequest: true };
        case GET_INGREDIENTS_SUCCESS:
            return { ...state, itemsFailed: false, items: action.items, itemsRequest: false };
        case GET_INGREDIENTS_FAILED:
            return { ...state, itemsFailed: true, itemsRequest: false };
        case INCREASE_INGREDIENT_COUNT: {
            const ind = (state?.items || []).findIndex(ing => ing?._id === action?.id);
            if (ind < 0) return state;
            const ingredient = state.items[ind];
            ingredient.count = ingredient.count && ingredient.count >= 0
                ? ingredient.count + 1
                : 1;
            return { ...state, items: [...state.items] };
        }
        case DECREASE_INGREDIENT_COUNT: {            
            const ind = (state?.items || []).findIndex(ing => ing?._id === action?.id);
            if (ind < 0) return state;
            const ingredient = state.items[ind];
            ingredient.count = ingredient.count && ingredient.count > 0
                ? ingredient.count - 1
                : 0;
            return { ...state, items: [...state.items] };
        }
        case RESET_INGREDIENTS_COUNT_BY_TYPE:
            (state?.items || [])
                .filter(ing => ing?.type === action?.typeIngredient)
                .map(ing => ing.count = 0);
            return { ...state, items: [...(state?.items || [])] };
        default:
            return state;
    }
}