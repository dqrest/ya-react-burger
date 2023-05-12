import {
    GET_CONSTRUCTOR_INGREDIENTS
    , ADD_CONSTRUCTOR_INGREDIENT    
    , DELETE_CONSTRUCTOR_INGREDIENT
    , CHANGE_ORDER_CONSTRUCTOR_INGREDIENTS
    , SET_BUN_TO_CONSTRUCTOR
    , DELETE_ALL_CONSTRUCTOR_INGREDIENTS
} from '../actions/burger-constructor-ingredients';

const initialState = {
    items: []
    , bun: null
};

export const constructorIngredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CONSTRUCTOR_INGREDIENTS:
            return { ...state };

        case ADD_CONSTRUCTOR_INGREDIENT:
            if (!action?.item) return state;
            const newItems = [...(state.items || []), action.item]
            return { ...state, items: newItems };        

        case DELETE_CONSTRUCTOR_INGREDIENT:
            if (state?.items && action?.deleteIndex >= 0 && action?.deleteIndex < state?.items?.length) {
                const items = state.items.filter((item, ind) => ind !== action.deleteIndex);
                return { ...state, items: items };
            }
            return state;

        case CHANGE_ORDER_CONSTRUCTOR_INGREDIENTS: {            
            const sourceIndex = action?.sourceIndex ?? -1,
                targetIndex = action?.targetIndex ?? -1,
                items = state?.items || [];
            if (sourceIndex < 0 || targetIndex < 0
                || sourceIndex >= items.length || targetIndex > items.length) return state;
            items.splice(targetIndex, 0, items[sourceIndex]);
            const deleteIndex = sourceIndex < targetIndex
                ? sourceIndex
                : sourceIndex + 1;
            items.splice(deleteIndex, 1);
            return { ...state, items: [...items] };
        }

        case SET_BUN_TO_CONSTRUCTOR:{                        
            return { ...state, bun: action?.bun }
        }

        case DELETE_ALL_CONSTRUCTOR_INGREDIENTS:{            
            return {...state, items: []}
        }
        default:
            return state;
    }
}