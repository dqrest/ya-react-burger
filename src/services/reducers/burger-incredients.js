import {
    GET_INGREDIENTS_REQUEST
    , GET_INGREDIENTS_FAILED
    , GET_INGREDIENTS_SUCCESS
} from '../actions/burger-incredients';


const initialState = {
    items: []    
};

export const ingredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST:
            return { ...state, itemsRequest: true };
        case GET_INGREDIENTS_SUCCESS:
            return { ...state, itemsFailed: false, items: action.items, itemsRequest: false };
        case GET_INGREDIENTS_FAILED:
            return { ...state, itemsFailed: true, itemsRequest: false };
        default:
            return state;
    }
}