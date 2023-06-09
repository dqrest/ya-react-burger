import { 
    GET_ORDER_DETAILS_FAILED
    , GET_ORDER_DETAILS_REQUEST
    , GET_ORDER_DETAILS_SUCCESS
    , DELETE_ORDER_DETAILS
} from '../action-types/order-details';
import { TBurgerOrderItemDto } from '../../shared/dtos/burger-order-item-dto';
import { TOrderDetailsReducerAction } from '../types/order-details';

export type TOrderState = {
    item?: TBurgerOrderItemDto | null;
    itemRequest: boolean;
    itemFailed: boolean;
}

const initialState: TOrderState = {
    item: null
    , itemRequest: false
    , itemFailed: false
};



export const orderDetailsReducer = (state = initialState, action: TOrderDetailsReducerAction) => {
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