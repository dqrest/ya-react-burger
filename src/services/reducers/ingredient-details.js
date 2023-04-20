import { SET_INGREDIENT_DETAILS, DELETE_INGREDIENT_DETAILS} from '../actions/ingredient-details';

const initialState = {
    item: null
};

export const ingredientDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INGREDIENT_DETAILS:
            return { ...state, item: action?.item };
        case DELETE_INGREDIENT_DETAILS:
            return { ...state, item: null };        
        default:
            return state;
    }
}

