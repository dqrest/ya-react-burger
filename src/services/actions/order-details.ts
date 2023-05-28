import { makeOrderRequest } from '../../utils/order-api';
import { TBurgerOrderItemDto } from '../../shared/dtos/burger-order-item-dto';

export const GET_ORDER_DETAILS_REQUEST = 'GET_ORDER_DETAILS_REQUEST';
export const GET_ORDER_DETAILS_SUCCESS = 'GET_ORDER_DETAILS_SUCCESS';
export const GET_ORDER_DETAILS_FAILED = 'GET_ORDER_DETAILS_FAILED';

export const DELETE_ORDER_DETAILS = 'DELETE_ORDER_DETAILS';


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

const getOrderDetailsAction = (): IGetOrderDetailsAction => ({
    type: GET_ORDER_DETAILS_REQUEST
});
const getOrderDetailsSuccessAction = (order: TBurgerOrderItemDto): IGetOrderDetailsSuccessAction => ({
    type: GET_ORDER_DETAILS_SUCCESS,
    order: order
});
const getOrderDetailsFailedAction = (): IGetOrderDetailsFailedAction => ({
    type: GET_ORDER_DETAILS_FAILED
});

export interface IDeleteOrderDetailsAction {
    readonly type: typeof DELETE_ORDER_DETAILS;
}

export function makeOrder(idIngredients: Array<string>
    , token: string
    , refreshToken: string) {
    return function (dispatch: any) {
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

export const deleteOrderDetails = () => (
    { type: DELETE_ORDER_DETAILS }
);
