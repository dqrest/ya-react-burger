import { GET_CONSTRUCTOR_INGREDIENTS } 
from '../actions/burger-constructor-ingredients';

const initialState = {
    items: []
};

export const constructorIngredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CONSTRUCTOR_INGREDIENTS:
            return { ...state };        
        default:
            return state;
    }
}