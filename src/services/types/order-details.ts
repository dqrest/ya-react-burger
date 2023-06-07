import { 
    GET_ORDER_DETAILS_FAILED
    , GET_ORDER_DETAILS_REQUEST
    , GET_ORDER_DETAILS_SUCCESS
    , DELETE_ORDER_DETAILS
} from '../action-types/order-details';
import { TBurgerOrderItemDto } from '../../shared/dtos/burger-order-item-dto';


export interface IGetOrderDetailsAction {
    readonly type: typeof GET_ORDER_DETAILS_REQUEST;
}
export interface IGetOrderDetailsSuccessAction {
    readonly type: typeof GET_ORDER_DETAILS_SUCCESS;
    readonly order: TBurgerOrderItemDto;
}
export interface IGetOrderDetailsFailedAction {
    readonly type: typeof GET_ORDER_DETAILS_FAILED;
}

export interface IDeleteOrderDetailsAction {
    readonly type: typeof DELETE_ORDER_DETAILS;
}

export type TOrderDetailsReducerAction =
    IDeleteOrderDetailsAction
    | IGetOrderDetailsAction
    | IGetOrderDetailsFailedAction
    | IGetOrderDetailsSuccessAction;