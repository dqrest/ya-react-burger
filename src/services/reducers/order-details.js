import {
    GET_ORDER_DETAILS_FAILED
    , GET_ORDER_DETAILS_REQUEST
    , GET_ORDER_DETAILS_SUCCESS
    , DELETE_ORDER_DETAILS
} from '../actions/order-details';

const initialState = {
    item: null
    , itemRequest: false
    , itemFailed: false
};

export const orderDetailsReducer = (state = initialState, action) => {    
    switch (action.type) {
        case GET_ORDER_DETAILS_REQUEST:
            return { ...state, itemRequest: true };
        case GET_ORDER_DETAILS_SUCCESS:            
            return { ...state, itemFailed: false, item: action.order, itemRequest: false };
        case GET_ORDER_DETAILS_FAILED:
            return { ...state, itemFailed: true, itemRequest: false };
        case DELETE_ORDER_DETAILS:
            return { ...state, itemFailed: false, item: null, itemRequest: false };
        default:
            return state;
    }
}