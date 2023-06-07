import { makeOrderRequest } from '../../utils/order-api';
import { TBurgerOrderItemDto } from '../../shared/dtos/burger-order-item-dto';

import { 
    GET_ORDER_DETAILS_FAILED
    , GET_ORDER_DETAILS_REQUEST
    , GET_ORDER_DETAILS_SUCCESS
    , DELETE_ORDER_DETAILS
} from '../action-types/order-details';

import { IGetOrderDetailsAction
    , IGetOrderDetailsSuccessAction
    , IGetOrderDetailsFailedAction
    , IDeleteOrderDetailsAction
} from '../types/order-details';
import type { AppDispatch, AppThunkAction } from '../types';

const getOrderDetailsAction =
    (): IGetOrderDetailsAction => ({
        type: GET_ORDER_DETAILS_REQUEST
    });

const getOrderDetailsSuccessAction =
    (order: TBurgerOrderItemDto): IGetOrderDetailsSuccessAction => ({
        type: GET_ORDER_DETAILS_SUCCESS,
        order: order
    });

const getOrderDetailsFailedAction =
    (): IGetOrderDetailsFailedAction => ({
        type: GET_ORDER_DETAILS_FAILED
    });



export function makeOrder(idIngredients: Array<string>
    , token: string
    , refreshToken: string): AppThunkAction  {
    return function (dispatch: AppDispatch) {
        dispatch(getOrderDetailsAction());
        makeOrderRequest(idIngredients, token, refreshToken)
            .then(res => {
                if (res && res.success) {
                    dispatch(getOrderDetailsSuccessAction(res.order));
                    return;
                }
                dispatch(getOrderDetailsFailedAction());
            })
            .catch(() => dispatch(getOrderDetailsFailedAction()));
    };
}

export const deleteOrderDetails = (): IDeleteOrderDetailsAction => (
    { type: DELETE_ORDER_DETAILS }
);
